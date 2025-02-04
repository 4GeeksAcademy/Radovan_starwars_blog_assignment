const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			favorites: [], // Aquí almacenamos los favoritos
			person: {},
		},
		actions: {
			loadPeople: () => {
				fetch("https://swapi.dev/api/people")
					.then(res => res.json())
					.then(data => {
						setStore({ people: data.results });
					})
					.catch(err => console.error("Error loading people:", err));
			},

			loadSinglePeople: async (id) => {
				try {
					const response = await fetch(`https://swapi.dev/api/people/${id}`);
					const data = await response.json();
					setStore({ person: data });
				} catch (error) {
					console.log(error);
					return false;
				}
			},

			loadPlanets: () => {
				fetch("https://www.swapi.tech/api/planets")
					.then(res => res.json())
					.then(data => {
						setStore({ planets: data.results });
					})
					.catch(err => console.error("Error loading planets:", err));
			},

			// Acción para agregar un elemento a favoritos
			addToFavorites: (name, link) => {
				const store = getStore();
				const newFavorite = { name, link };
				setStore({ favorites: [...store.favorites, newFavorite] });
			},

			// Acción para eliminar un favorito
			removeFromFavorites: (link) => {
				const store = getStore();
				setStore({
					favorites: store.favorites.filter(fav => fav.link !== link),
				});
			},
		},
	};
};
export default getState;