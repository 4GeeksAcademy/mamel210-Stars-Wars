import React from "react";


export const Favorites = () => {
    
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Favorites
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                    1
                </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end">
                <li className="d-flex align-items-center">
                    <span className="dropdown-item">
                        Darth Vader - Character
                    </span>
                    <button type="button" className="btn btn-outline-danger">
                        <i className="fa fa-trash"></i>
                    </button>
                </li>
            </ul>
        </div>
    )
}
