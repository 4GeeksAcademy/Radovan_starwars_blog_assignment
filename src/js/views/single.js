import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = (props) => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();  // Obtenemos el ID del personaje de la URL

    // Cargar los detalles del personaje al montar el componente
    useEffect(() => {
        actions.loadSinglePeople(theid);  // Cargamos los datos del personaje
    }, [theid]);

    // Comprobamos si la persona está cargada correctamente
    if (!store.person.name) {
        return <div>Loading...</div>; // Muestra un loading mientras se carga la información
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Imagen a la izquierda */}
                <div className="col-md-4">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/characters/${theid}.jpg`} // Imagen del personaje
                        alt={store.person.name}
                        className="img-fluid"
                        style={{ width: "80%", borderRadius: "10px" }} // Imagen más pequeña
                    />
                </div>

                {/* Propiedades*/}
                <div className="col-md-8">
                    <h2>{store.person.name}</h2>
                    <p>
                        <strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Curabitur pharetra ultricies metus, vel auctor augue vehicula at. Nunc efficitur dui non arcu fermentum, a tempus ipsum sodales. Mauris eget est at nunc suscipit posuere. Donec id nisl id erat fermentum condimentum. Nullam mollis felis sapien, vel tincidunt erat placerat sed.
                    </p>

                    {/* Propiedades */}
                    <div className="d-flex justify-content-start flex-column">
                        <div className="m-2" style={{ fontSize: "2rem" }}>
                            <strong>Eye Color:</strong> {store.person.eye_color}
                        </div>
                        <div className="m-2" style={{ fontSize: "2rem" }}>
                            <strong>Hair Color:</strong> {store.person.hair_color}
                        </div>
                        <div className="m-2" style={{ fontSize: "2rem" }}>
                            <strong>Gender:</strong> {store.person.gender}
                        </div>
                        <div className="m-2" style={{ fontSize: "2rem" }}>
                            <strong>Birth Year:</strong> {store.person.birth_year}
                        </div>

                    </div>

                    {/* Enlace para regresar a la lista de personajes */}
                    <Link to="/" className="btn btn-secondary mt-3">Back to All Characters</Link>
                </div>
            </div>
        </div>
    );
};

Single.propTypes = {
    match: PropTypes.object
};
