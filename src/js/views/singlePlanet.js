import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const SinglePlanet = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams(); // Obtenemos el ID del planeta desde la URL

    // Cargar los detalles del planeta al montar el componente
    useEffect(() => {
        actions.loadSinglePlanet(theid); // Cargamos los datos del planeta
    }, [theid]);

    // Comprobamos si el planeta está cargado correctamente antes de mostrar
    if (!store.planet || !store.planet.name) {
        return <div>Loading...</div>; // Muestra un loading mientras se carga la información
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {/* Imagen del planeta */}
                <div className="col-md-4">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/planets/${theid}.jpg`} // Imagen del planeta
                        alt={store.planet.name}
                        className="img-fluid"
                        style={{ width: "100%", borderRadius: "10px" }} // Imagen más pequeña
                    />
                </div>

                {/* Propiedades  */}
                <div className="col-md-8">
                    <h2>{store.planet.name}</h2>
                    <p>
                        <strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Curabitur pharetra ultricies metus, vel auctor augue vehicula at. Nunc efficitur dui non arcu fermentum, a tempus ipsum sodales. Mauris eget est at nunc suscipit posuere. Donec id nisl id erat fermentum condimentum. Nullam mollis felis sapien, vel tincidunt erat placerat sed.
                    </p>

                    {/* Propiedades */}
                    <div className="d-flex justify-content-start flex-column">
                        <div className="m-2" style={{ fontSize: "2rem" }}>
                            <strong>Climate:</strong> {store.planet.climate}
                        </div>
                        <div className="m-2" style={{ fontSize: "2rem" }}>
                            <strong>Terrain:</strong> {store.planet.terrain}
                        </div>
                        <div className="m-2" style={{ fontSize: "2rem" }}>
                            <strong>Population:</strong> {store.planet.population}
                        </div>
                        <div className="m-2" style={{ fontSize: "2rem" }}>
                            <strong>Diameter:</strong> {store.planet.diameter}
                        </div>

                    </div>

                    {/* Enlace para regresar a la lista de planetas */}
                    <Link to="/" className="btn btn-secondary mt-3">Back to All Planets</Link>
                </div>
            </div>
        </div>
    );
};

export default SinglePlanet;
