import React, { useContext } from "react";

import { CardCollections } from "../component/CardCollections.jsx";
import { Context } from "../store/appContext.js";

export const Starships = () => {
    const { store } = useContext(Context);

    return <CardCollections data={store.starships} title={'Starships'} model={'starships'} />
}
