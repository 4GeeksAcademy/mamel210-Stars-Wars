import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Favorites = () => {
    const { actions, store } = useContext(Context)
    const handleRemove = (item) => {
        actions.removeToFavorits(item)

    }
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Favorites
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                    {store?.favorites?.length >= 1 ? store?.favorites?.length : '0'}
                </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-lg-end">
                {store?.favorites?.map((item) => {
                    return (
                        <li key={item.item.uid} className="d-flex align-items-center">
                            <span className="dropdown-item">
                                {item.item.name} - {item.model}
                            </span>
                            <button type="button" className="btn btn-outline-danger">
                                <i onClick={() => handleRemove(item)} className="fa fa-trash"></i>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
