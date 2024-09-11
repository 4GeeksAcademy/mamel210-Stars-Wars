import React from "react";
import { Link } from "react-router-dom";

export const CardCollections = ({ data, title, model }) => {
    const handleError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    }
    return (
        <div className="container my-3">
            <h1 className="text-center text-primary">{title}</h1>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2">
                {data.map((item) =>
                    <div className="col"key={item.uid}>
                        <div key={item.uid} className="card border-dark my-3 mx-2 text-bg-dark">
                            <img src={`https://starwars-visualguide.com/assets/img/${model}/${item.uid}.jpg`} className="card-img-top cardImg" alt="..."
                                onError={handleError} />
                            {/* {<img src={`https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`} className="card-img-top" alt="..." 
                    onError={handleError}/> } */}
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/${model}/${item.uid}`} className="btn btn-secondary">Details</Link>
                                    <i className="far fa-heart fa-2x text-danger"></i>
                                    <i className="fas fa-heart fa-2x text-danger"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

