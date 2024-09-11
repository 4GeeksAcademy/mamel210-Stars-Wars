import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { CardCollections } from "../component/CardCollections.jsx";


export const Characters = () => {
    const { store } = useContext(Context);
    
    return <CardCollections data={store.characters} title={'Characters'} model={'characters'} />
}
