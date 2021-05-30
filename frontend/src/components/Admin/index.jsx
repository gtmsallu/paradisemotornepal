import AdminHeader from "./Header";
import AdminFooter from "./Footer";
import Sidebar from "./Sidebar";
import PullRequests from "./Pages/Requests";
import { Redirect, Route, Switch } from "react-router";
import ContactMessages from "./Pages/Messages";

import './admin.css';
import Subscribers from "./Pages/Subscribers";
import AddWork from "./Pages/Work/add-work";
import ViewWork from "./Pages/Work/view-work";
import AddTeam from "./Pages/Teams/add-team";
import AddReview from "./Pages/Reviews/add-review";
import ViewReview from "./Pages/Reviews/view-review";
import ViewTeam from "./Pages/Teams/view-team";


const AdminPage = (props) => {

    document.title = 'Admin Panel | Paradise Motors Nepal'

    return (<div className="aap">


        <Sidebar />

        <div className="content-page">

            <AdminHeader />

            <div className="container-fluid">

                <Switch>
                    <Route exact path="/admin" component={PullRequests} />
                    <Route path="/admin/requests" component={PullRequests} />

                    <Route path="/admin/messages" component={ContactMessages} />

                    <Route path="/admin/add-work" component={AddWork} />
                    <Route path="/admin/view-work" component={ViewWork} />

                    <Route path="/admin/add-team" component={AddTeam} />
                    <Route path="/admin/view-team" component={ViewTeam} />

                    <Route path="/admin/add-review" component={AddReview} />
                    <Route path="/admin/view-review" component={ViewReview} />

                    <Route path="/admin/subscribers" component={Subscribers} />


                    <Route path="*">
                        <Redirect to="/" />
                    </Route>

                </Switch>
            </div>

            <AdminFooter />
        </div>


    </div>);
}

export default AdminPage;