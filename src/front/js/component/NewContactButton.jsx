import React from "react";
import { Link } from "react-router-dom";

export const NewContactButton = () => {
	return (
		<nav className="navbar navbar-light">
			<div className="container"
				style={{
					display: 'flex',
					flexWrap: 'inherit',
					alignItems: 'center',
					justifyContent: 'space-between',
					flexDirection: 'row-reverse'
				}}
			>
				<div className="">
					<Link to="/add-contact">
						<button className="btn btn-success">Add new contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
