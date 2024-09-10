import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom Component
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom Pages
import { Contacts } from "./pages/Contacts.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Error404 } from "./pages/Error404.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { Characters } from "./pages/Characters.jsx";
import { Planets } from "./pages/Planets.jsx";
import { Starships } from "./pages/Starships.jsx";
import { Home } from "./pages/Home.jsx";
import { Details } from "./component/Details.jsx";


// Create your first Component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="d-flex flex-column h-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Characters />} path='/characters' />
                        <Route element={<Planets />} path='/planets' />
                        <Route element={<Starships />} path='/starships' />
                        <Route element={<Contacts />} path='/contacts' />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<AddContact />} path='/add-contact' />
                        <Route element={<EditContact />} path='/edit-contact' />
                        <Route element={<Details />} path='/characters/:uid' />
                        <Route element={<Error404 />} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter >
        </div >
    );
};

export default injectContext(Layout);
