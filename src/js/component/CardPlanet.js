import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa"; // Importamos el ícono de corazón
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";  // Importar el Context

const CardPlanet = (props) => {
    const [liked, setLiked] = useState(false); // Estado para manejar si el corazón está lleno o no
    const { store, actions } = useContext(Context); // Obtener acceso al contexto de favoritos

    // Verificamos si el planeta ya está en los favoritos al cargar el componente
    useEffect(() => {
        const isFavorite = store.favorites.some(fav => fav.link === `/singlePlanet/${props.uid}`);
        setLiked(isFavorite);
    }, [store.favorites, props.uid]); // Ejecutar cuando los favoritos cambian

    const handleHeartClick = () => {
        if (liked) {
            // Si ya está en favoritos, solo eliminamos
            actions.removeFromFavorites(`/singlePlanet/${props.uid}`);
            setLiked(false); // Cambiar el estado del corazón a no "liked"
        } else {
            // Si no está en favoritos, lo agregamos
            actions.addToFavorites(props.name, `/singlePlanet/${props.uid}`);
            setLiked(true); // Cambiar el estado del corazón a "liked"
        }
    };

    const url = props.uid == 1 ? "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png" : "https://starwars-visualguide.com/assets/img/planets/" + props.uid + ".jpg";

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={url} className="card-img-top" alt={props.name} />
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/singlePlanet/${props.uid}`} className="btn btn-primary">Learn More</Link>
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

export default CardPlanet;
