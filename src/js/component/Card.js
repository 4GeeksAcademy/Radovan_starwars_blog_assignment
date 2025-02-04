import React, { useState, useEffect } from "react";
import "../../styles/Card.css";  // Importar el archivo de estilos CSS
import { FaHeart } from "react-icons/fa"; // Importamos el ícono de corazón
import { Link } from "react-router-dom"
import { useContext } from "react";
import { Context } from "../store/appContext"; // Importamos el Context

const Card = (props) => {
    const [liked, setLiked] = useState(false); // Estado para manejar si el corazón está lleno o no
    const { store, actions } = useContext(Context); // Obtener acceso al contexto de favoritos

    useEffect(() => {
        // Verificamos si el elemento ya está en los favoritos
        const isFavorite = store.favorites.some(fav => fav.link === `#${props.uid}`);
        setLiked(isFavorite);
    }, [store.favorites, props.uid]); // Ejecutar cuando los favoritos cambian

    // Manejar clic en el corazón
    const handleHeartClick = () => {
        setLiked(!liked);
        if (!liked) {
            // Solo agregar a favoritos si el corazón no está marcado
            props.addFavorite(props.name, `#${props.uid}`);
        } else {
            // Eliminar de los favoritos si el corazón está marcado
            props.removeFavorite(`#${props.uid}`);
        }
    };

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img
                src={"https://starwars-visualguide.com/assets/img/characters/" + props.uid + ".jpg"}
                className="card-img-top"
                alt={props.name}
            />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">
                    <strong>Eye Color:</strong> {props.eye_color}
                    <br />
                    <strong>Hair Color:</strong> {props.hair_color}
                    <br />
                    <strong>Gender:</strong> {props.gender}
                </p>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/single/${props.uid}`} className="btn btn-primary">Learn More</Link>
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

export default Card;
