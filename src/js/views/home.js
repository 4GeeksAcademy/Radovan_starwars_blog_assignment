import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Card from "../component/Card";
import CardPlanet from "../component/CardPlanet";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		if (store.people.length === 0) {
			actions.loadPeople();
		}
		if (store.planets.length === 0) {
			actions.loadPlanets();
		}
	}, [actions, store.people.length, store.planets.length]);

	return (
		<div className="text-center mt-5">
			<h1>Star Wars blog</h1>

			<h2>Personajes</h2>
			<div className="d-flex overflow-auto p-2 mb-4" style={{ maxWidth: "100%" }}>
				{store.people.map((item, index) => (
					<div key={index} className="card-item me-3" style={{ width: "18rem" }}>
						<Card
							name={item.name}
							uid={index + 1}
							eye_color={item.eye_color}
							hair_color={item.hair_color}
							gender={item.gender}
							addFavorite={actions.addToFavorites} // Usamos la acción global para agregar favoritos
						/>
					</div>
				))}
			</div>

			<h2>Planetas</h2>
			<div className="d-flex overflow-auto p-2" style={{ maxWidth: "100%" }}>
				{store.planets.map((item, index) => (
					<div key={index} className="card-item me-3" style={{ width: "18rem" }}>
						<CardPlanet
							name={item.name}
							uid={item.uid}
							population={item.population}
							climate={item.climate}
							terrain={item.terrain}
							diameter={item.diameter}
						/>
					</div>
				))}
			</div>
		</div>
	);
};
