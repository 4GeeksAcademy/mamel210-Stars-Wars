import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import ContentLoader from 'react-content-loader'


export const Details = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    console.log(store);

    useEffect(() => {
        actions.getDetails(params.uid)
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
                        <img className="img-fluid rounded-start" src={`https://starwars-visualguide.com/assets/img/characters/${params.uid}.jpg`} />
                    </div>
                    <div className="col-md-5 col-lg-6 col-xl-7">
                        <div className="card-body">
                            <h1>{store?.details?.properties?.name}</h1>
                            <p><strong>Height: </strong>{store?.details?.properties?.height}</p>
                            <p><strong>Mass: </strong>{store?.details?.properties?.mass}</p>
                            <p><strong>Hair color: </strong>{store?.details?.properties?.hair_color}</p>
                            <p><strong>Skin color: </strong>{store?.details?.properties?.skin_color}</p>
                            <p><strong>Eye color: </strong>{store?.details?.properties?.eye_color}</p>
                            <p><strong>Birth year: </strong>{store?.details?.properties?.birth_year}</p>
                            <p><strong>Gender: </strong>{store?.details?.properties?.gender}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}