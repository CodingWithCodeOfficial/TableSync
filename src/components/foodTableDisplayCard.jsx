import "../App.css";

function TableFoodCard({ name, img, status, table }) {
  return (
    <div className="card">
      <h1 className="card-title">{name}</h1>
      <img src={img} className="card-image" alt={name} />
      <p className="card-description">Status: {status || "Pending"}</p>
      <p className="card-description">Table: {table}</p>
    </div>
  );
}

export default TableFoodCard;