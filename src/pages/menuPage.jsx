import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import '../App.css';
import FoodAddCard from "../components/foodAddCard";

function MenuPage() {
  const [food, setFood] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const foodCollectionRef = collection(db, "food");

  // Load menu items from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(foodCollectionRef, (snapshot) => {
      const updatedFood = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setFood(updatedFood);
      setIsLoading(false);
    }, (error) => {
      console.error("Error loading menu items: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter food items based on search term
  const filteredFood = food.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Menu Page</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading ? (
        <p>Loading menu...</p>
      ) : (
        <div>
          {filteredFood.length > 0 ? (
            filteredFood.map((item) => (
              <FoodAddCard
                key={item.id}
                name={item.name}
                img={item.img}
                description={item.description}
              />
            ))
          ) : (
            <p>No food items match your search.</p>
          )}
        </div>
      )}
    </>
  );
}

export default MenuPage;