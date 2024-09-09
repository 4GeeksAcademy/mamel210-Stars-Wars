import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";


export const DetailCharacters = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    console.log(params);

    useEffect(() => {
        actions.getCharacterDetails(params.uid)
    }, [])

    return (
        <div className="container">
            <h1 className="text-center text-success">{store.currentCharacter.name}</h1>
            <p>{store.currentCharacter.homeworld}</p>
        </div>
    )
}