import React from "react";
import { Link } from "react-router-dom";
import { Favorites } from "./Favorites.jsx";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-dark bg-dark mb-3">
			<div className="container-fluid d-flex justify-content-between mx-md-4 mt-4 mb-1">
				<Link className="navbar-brand mb-0 h1" to="/">
					<img height={"55"} src="https://starwars.chocobar.net/star-wars-logo.png" alt="Logo" />
				</Link>
				<div>
					<div className="nav me-auto mb-2 mb-lg-0">
						<div className="nav-item">
							<Link to={"/characters"} className="nav-link link-secondary">Characters</Link>
						</div>
						<div className="nav-item">
							<Link to={"/planets"} className="nav-link link-secondary">Planets</Link>
						</div>
						<div className="nav-item">
							<Link to={"/starships"} className="nav-link link-secondary">Starships</Link>
						</div>
						<div className="nav-item">
							<Link to={"/contacts"} className="nav-link link-secondary">Contacts</Link>
						</div>
						<div className="nav-item">
							<Favorites />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
