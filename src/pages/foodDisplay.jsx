// FoodDisplay.js
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db } from '../firebaseConfig';
import { collection, getDocs, onSnapshot, updateDoc, doc, deleteDoc } from "firebase/firestore";
import '../App.css';
import FoodCard from "../components/foodDisplayCard";

function FoodDisplay() {
  const displayFoodCollectionRef = collection(db, "display-food");
  const [displayFood, setDisplayFood] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTable, setFilterTable] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getFood = async () => {
    try {
      const data = await getDocs(displayFoodCollectionRef);
      setDisplayFood(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error fetching initial food data: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFood();

    const unsubscribe = onSnapshot(
      displayFoodCollectionRef,
      (snapshot) => {
        const updatedFood = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setDisplayFood(updatedFood);
      },
      (error) => {
        console.error("Error with real-time updates: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      const foodDoc = doc(db, "display-food", id);
      await updateDoc(foodDoc, { status: newStatus });
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const foodDoc = doc(db, "display-food", id);
      await deleteDoc(foodDoc);
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  const filteredFood = displayFood
    .filter((item) => (filterTable ? item.table === filterTable : true))
    .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <h1>TableSync</h1>
      <h1 className='fooddisplay'>Chef Food Display Page</h1>
      <button onClick={() => navigate("/foodadd")}>Navigate to Food Add Page</button>
      <input
        type="text"
        placeholder="Search Food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <button onClick={() => setFilterTable(null)}>Show All</button>
        <button onClick={() => setFilterTable(1)}>Table 1</button>
        <button onClick={() => setFilterTable(2)}>Table 2</button>
        <button onClick={() => setFilterTable(3)}>Table 3</button>
        <button onClick={() => setFilterTable(4)}>Table 4</button>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          filteredFood.map((item) => (
            <FoodCard
              key={item.id}
              name={item.name}
              img={item.img}
              description={item.description}
              status={item.status || "Pending"}
              table={item.table}
              onSetStatus={(newStatus) => updateStatus(item.id, newStatus)}
              onDelete={() => deleteOrder(item.id)}
            />
          ))
        )}
      </div>
    </>
  );
}

export default FoodDisplay;
