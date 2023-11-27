import "../styles/Card.css";

const Card = ({ imgUrl, title, description }) => {
  return (
    <div className="task">
      <img src={imgUrl} alt="images" />
      
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

  );
};

export default Card;
