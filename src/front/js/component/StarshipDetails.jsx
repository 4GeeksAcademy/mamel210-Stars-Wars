import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const StarshipDetails = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const handleError = (event) => {
        event.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    }

    useEffect(() => {
        actions.getStarshipsDetails(params.uid)
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
                        <img onError={handleError} className="img-fluid rounded-start" src={`https://starwars-visualguide.com/assets/img/starships/${params.uid}.jpg`} />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body">
                            <h1>{store?.starshipsDetails?.properties?.name}</h1>
                            <p><strong>Model: </strong>{store?.starshipsDetails?.properties?.model}</p>
                            <p><strong>Starship class: </strong>{store?.starshipsDetails?.properties?.starship_class}</p>
                            <p><strong>Manufacture: </strong>{store?.starshipsDetails?.properties?.manufacturer}</p>
                            <p><strong>Cost in credits: </strong>{store?.starshipsDetails?.properties?.cost_in_credits}</p>
                            <p><strong>Length: </strong>{store?.starshipsDetails?.properties?.length}</p>
                            <p><strong>Crew: </strong>{store?.starshipsDetails?.properties?.crew}</p>
                            <p><strong>Passengers: </strong>{store?.starshipsDetails?.properties?.passengers}</p>
                            <p><strong>Max atmosphering speed: </strong>{store?.starshipsDetails?.properties?.max_atmosphering_speed}</p>
                            <p><strong>Hyperdrive rating: </strong>{store?.starshipsDetails?.properties?.hyperdrive_rating}</p>
                            <p><strong>MGLT: </strong>{store?.starshipsDetails?.properties?.MGLT}</p>
                            <p><strong>Cargo capacity: </strong>{store?.starshipsDetails?.properties?.cargo_capacity}</p>
                            <p><strong>Consumables: </strong>{store?.starshipsDetails?.properties?.consumables}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
