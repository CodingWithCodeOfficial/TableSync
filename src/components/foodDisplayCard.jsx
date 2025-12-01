// FoodCard.js
import "../App.css";

function FoodCard({ name, img, description, status, onSetStatus, onDelete, table }) {
  return (
    <div className='card'>
      <h1 className='card-title'>{name}</h1>
      <img src={img} className='card-image' alt={name} />
      <p className='card-description'>{description}</p>
      <p>Status: {status || "Pending"}</p>
      <p>Table: {table || "N/A"}</p>
      <div className="card-actions">
        <button onClick={() => onSetStatus("Pending")} className="card-button">Set as Pending</button>
        <button onClick={() => onSetStatus("Preparing")} className="card-button">Set as Preparing</button>
        <button onClick={() => onSetStatus("Ready")} className="card-button">Set as Ready</button>
        <button onClick={onDelete} className="card-button">Mark as Completed</button>
      </div>
    </div>
  );
}

export default FoodCard;
