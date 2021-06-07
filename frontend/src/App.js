import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import logo from'./logo.svg';
import "./App.css";
// Import slider css files
import "./css/slick/slick.css";
import "./css/slick/slick-theme.css";
import AdminPage from "./components/Admin";
import MainRouter from "./MainRouter";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";

function App() {
  return (
    <Router>
      <Switch>
        {/* admin routes */}
        <Route path="/admin" component={AdminPage} />

        {/* frontend routes */}
        <Route path="*">
          <MainRouter />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
