import React, { useState, useEffect } from "react";
import getState from "./flux.js";


export const Context = React.createContext(null);

// Este es el contexto que se inyectará en los componentes que lo necesiten
const injectContext = (PassedComponent) => {
	const StoreWrapper = (props) => {
		// Inicializamos el estado con el flujo de datos
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: (updatedStore) =>
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			/**
			 * Este es el lugar donde podrías realizar tus solicitudes HTTP o inicializar datos
			 * Si fuera necesario, puedes hacer un fetch aquí, pero en este caso no lo estamos haciendo.
			 * Si necesitas realizar alguna acción que se ejecute al cargar, puedes usar:
			 * state.actions.loadSomeData();
			 */
		}, []);

		// Proporcionamos el contexto a los componentes envueltos
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};

	return StoreWrapper;
};

export default injectContext;