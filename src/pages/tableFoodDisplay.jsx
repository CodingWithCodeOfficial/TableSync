import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import "../App.css";
import TableFoodCard from "../components/foodTableDisplayCard";

function TableFoodDisplay() {
  const [displayFood, setDisplayFood] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); // Get tableId from URL parameters
  const displayFoodCollectionRef = collection(db, "display-food");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      displayFoodCollectionRef,
      (snapshot) => {
        const updatedFood = snapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((item) => item.table === parseInt(id)); // Filter by tableId
        setDisplayFood(updatedFood);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error with real-time updates: ", error);
      }
    );

    return () => unsubscribe();
  }, [id]);

  return (
    <>
      <h1>TableSync</h1>
      <h1 className="foodtabledisplay">Customer Food Display for Table {id}</h1>
      <button onClick={() => navigate("/foodadd")}>Navigate to Food Add Page</button>

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          displayFood.map((item) => (
            <TableFoodCard
              key={item.id}
              name={item.name}
              img={item.img}
              status={item.status}
              table={item.table}
            />
          ))
        )}
      </div>
    </>
  );
}

export default TableFoodDisplay;