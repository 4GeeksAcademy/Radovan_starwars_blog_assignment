import React, { useState } from "react";
import { FaHeart } from "react-icons/fa"; // Importamos el ícono de corazón
import { Link } from "react-router-dom";

const CardPlanet = (props) => {
    const [liked, setLiked] = useState(false); // Estado para manejar si el corazón está lleno o no

    const handleHeartClick = () => {
        setLiked(!liked);
        if (!liked) {
            // Solo agregar a favoritos si el corazón no está marcado
            props.addFavorite(props.name, `#${props.uid}`);
        } else {
            // Aquí puedes agregar la lógica para quitar el favorito si lo deseas
        }
    };

    const url = props.uid == 1 ? "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png" : "https://starwars-visualguide.com/assets/img/planets/" + props.uid + ".jpg";

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={url} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/singlePlanet/${props.uid}`} className="btn btn-primary">Learn More</Link>
                    <button
                        className={`btn ${liked ? "btn-danger" : "btn-outline-danger"} heart-button`}
                        onClick={handleHeartClick}
                    >
                        <FaHeart style={{ fontSize: "20px", color: liked ? "white" : "black" }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardPlanet;
