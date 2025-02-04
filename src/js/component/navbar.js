import React, { useContext } from "react";
import { Context } from "../store/appContext"; // Para acceder a los favoritos
import { Dropdown } from "react-bootstrap";
import { FaTrash } from "react-icons/fa"; // Icono de basura

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	const removeFavorite = (link) => {
		actions.removeFromFavorites(link); // Llamamos a la acción de Flux para eliminar el favorito
	};

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="container">
				<span className="navbar-brand mb-0 h1">Star Wars Blog</span>
				<Dropdown className="ms-auto">
					<Dropdown.Toggle variant="success" id="dropdown-custom-components">
						Favoritos ({store.favorites.length})
					</Dropdown.Toggle>

					<Dropdown.Menu>
						{store.favorites.map((fav, index) => (
							<Dropdown.Item
								key={index}
								className="d-flex justify-content-between align-items-center"
							>
								<a href={fav.link} target="_blank" rel="noopener noreferrer">
									{fav.name}
								</a>
								<FaTrash
									onClick={() => removeFavorite(fav.link)} // Remover de los favoritos
									style={{ cursor: "pointer", color: "red" }}
								/>
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
			</div>
		</nav>
	);
};
