import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const CardCollections = ({ data, title, model }) => {

    const { actions, store } = useContext(Context)
    const isFavorite = (uid) => {
        return store.favorites.some(fav => fav.item.uid === uid)
    }

    const handleAddToFavorites = (item) => {
        actions.addToFavorits(item, title)
    }
    const handleError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';

    }
    return (
        <div className="container my-3">
            <h1 className="text-center text-primary">{title}</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                {data.map((item) =>
                    <div className="col" key={item.uid}>
                        <div key={item.uid} className="card border-dark my-3 mx-2 text-bg-dark">
                            <img src={`https://starwars-visualguide.com/assets/img/${model}/${item.uid}.jpg`} className="card-img-top cardImg" alt="..."
                                onError={handleError} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/${model}/${item.uid}`} className="btn btn-secondary">Details</Link>
                                    <button className={`btn ${isFavorite(item.uid)? 'btn-warning': 'btn-outline-warning'} `} onClick={() => handleAddToFavorites(item)}>
                                        <i className={`far fa-heart ${isFavorite(item.uid)? 'text-danger': 'text-success'} fa-lg`}></i>
                                    </button>                                  
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

