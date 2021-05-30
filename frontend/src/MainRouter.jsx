

import { Route, Switch } from "react-router";

import Header from "./components/Header";
import Footer from "./components/Footer";

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


const MainRouter = () => {

    return (
        <>
            <Header />
            <main>
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
            </main>
            <Footer />
        </>
    );

}

export default MainRouter;