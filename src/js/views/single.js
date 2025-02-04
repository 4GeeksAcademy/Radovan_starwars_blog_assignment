import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const { theid } = useParams();
	useEffect(() => {
		actions.loadSinglePeople(theid)
	}, [])

	return (
		<div className="container mt-3">
			<h2>{store.person.name}</h2>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
