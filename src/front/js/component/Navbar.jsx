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
{/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Pricing</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
    </div>
  </div>
</nav> */}