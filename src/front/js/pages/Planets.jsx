import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { CardCollections } from "../component/CardCollections.jsx";

export const Planets = () => {
    const { store } = useContext(Context);
    
    return <CardCollections data={store.planets} title={'Planets'} model={'planets'} />
}