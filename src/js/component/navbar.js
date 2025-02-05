// Navbar.js
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Dropdown } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    const removeFavorite = (link) => {
        actions.removeFromFavorites(link);
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
                                <div>
                                    
                                    <Link to={fav.link} className="text-decoration-none">
                                        {fav.name}
                                    </Link>
                                </div>
                                <FaTrash
                                    onClick={() => removeFavorite(fav.link)}
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
