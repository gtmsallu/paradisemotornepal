

import { Route, Switch } from "react-router";
import {initialState, reducer} from "./reducer/UseReducer"
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';

import HomeCarousel from "./components/Section/homeCarousel";
import About from "./components/Section/about";
import Works from "./components/Section/works";
import Clients from "./components/Section/clients";

// pages

import WorksPage from "./components/Pages/Works";
import TeamsPage from "./components/Pages/Teams";
import ContactPage from "./components/Pages/Contact";
import PrivacyPage from "./components/Pages/Privacy";

import ReviewsPage from "./components/Pages/Reviews";

import NotFound from "./components/NotFound";
import { createContext, useReducer } from "react";

export const  UserContext = createContext();
const Routing=()=>{
    return(
        <Switch>
        <Route exact path="/">
            <HomeCarousel />
            <About />
            <Works />
            <Clients />
        </Route>

        <Route path="/works" component={WorksPage} />
        <Route path="/teams" component={TeamsPage} />
        <Route path="/contact" component={ContactPage} />

        <Route path="/reviews" component={ReviewsPage} />

        <Route path="/privacy" component={PrivacyPage} />



        {/* <Route path="*" render={() => <Redirect to={{ pathname: "/" }} />} /> */}
        <Route path="*" component={NotFound} />
    </Switch>

    )

}
const MainRouter = () => {
   
const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <>
        <UserContext.Provider value={{state, dispatch}}>

            <Header />
            <main>
                <Routing />
                 </main>
            <Footer />
            <ToastContainer />
            </UserContext.Provider>

        </>
    );

}

export default MainRouter;