import React, { useState, useEffect } from "react";
import "../../styles/Card.css";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

const Card = (props) => {
    const [liked, setLiked] = useState(false); // Estado para manejar si el corazón está liked o no
    const { store, actions } = useContext(Context); // Obtener acceso al contexto de favoritos

    // Verificamos si el personaje ya está en los favoritos al cargar el componente
    useEffect(() => {
        const isFavorite = store.favorites.some(fav => fav.link === `/single/${props.uid}`);
        setLiked(isFavorite);
    }, [store.favorites, props.uid]); // Ejecutar cuando los favoritos cambian

    const handleHeartClick = () => {
        if (liked) {
            // Si ya está en favoritos, solo eliminamos
            actions.removeFromFavorites(`/single/${props.uid}`);
            setLiked(false); // Cambiar el estado del corazón a no "liked"
        } else {
            // Si no está en favoritos, lo agregamos
            actions.addToFavorites(props.name, `/single/${props.uid}`);
            setLiked(true); // Cambiar el estado del corazón a "liked"
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
                        disabled={liked} // Deshabilitar el botón si ya está en favoritos
                    >
                        <FaHeart style={{ fontSize: "20px", color: liked ? "white" : "black" }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
