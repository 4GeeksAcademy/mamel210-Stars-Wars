import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";


export const PlanetDetails = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    console

    useEffect(() => {
        actions.getPlanetsDetails(params.uid)
    }, [])
    if (store.isLoading) {
        return <div className=" text-light d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    return (
        <div className="container bg-dark">
            <div className="card my-2  bg-dark text-light">
                <div className="row g-0">
                    <div className="col-md-7 col-lg-6 col-xl-5">
                        <img className="img-fluid rounded-start" src={`https://starwars-visualguide.com/assets/img/planets/${params.uid}.jpg`} />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body">
                            <h1>{store?.planetDetails?.properties?.name}</h1>
                            <p><strong>diameter: </strong>{store?.planetDetails?.properties?.diameter}</p>
                            <p><strong>rotation period: </strong>{store?.planetDetails?.properties?.rotation_period}</p>
                            <p><strong>Orbital Period: </strong>{store?.planetDetails?.properties?.orbital_period}</p>
                            <p><strong>Gravity: </strong>{store?.planetDetails?.properties?.gravity}</p>
                            <p><strong>Population: </strong>{store?.planetDetails?.properties?.population}</p>
                            <p><strong>Climate: </strong>{store?.planetDetails?.properties?.climate}</p>
                            <p><strong>Terrain: </strong>{store?.planetDetails?.properties?.terrain}</p>
                            <p><strong>Surface Water: </strong>{store?.planetDetails?.properties?.surface_water}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
