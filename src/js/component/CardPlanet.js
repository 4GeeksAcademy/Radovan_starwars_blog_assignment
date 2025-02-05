import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa"; // 
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";  

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

    // Obtener los detalles del planeta desde las props
    const { name, population, climate, terrain, diameter, uid } = props;

    const url = uid == 1 ? "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png" : "https://starwars-visualguide.com/assets/img/planets/" + uid + ".jpg";

    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={url} className="card-img-top" alt={name} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">
                    <strong>Population:</strong> {population}
                    <br />
                    <strong>Climate:</strong> {climate}
                    <br />
                    <strong>Terrain:</strong> {terrain}
                    <br />
                    <strong>Diameter:</strong> {diameter} km
                </p>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/singlePlanet/${uid}`} className="btn btn-primary">Learn More</Link>
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
