import "../App.css";

function FoodAddCard({ name, img, description, onAdd }) {
  return (
    <div className='card'>
      <h1 className='card-title'>{name}</h1>
      <img src={img} className='card-image' alt={name} />
      <h1 className='card-title'>{description}</h1>
      <button onClick={onAdd} className="card-button">Add to Order</button>
    </div>
  );
}

export default FoodAddCard;