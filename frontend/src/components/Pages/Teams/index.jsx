import React, { useEffect } from "react";
import './teams.css';


const TeamsPage = () => {

  document.title = 'Our Team | Paradise Motors Nepal';

  return (
    <div className="teams-page">
      <div className="container pt-4">

        <div className="bg_">
        </div>

        <div className="intro">
          <h5 className="fw-bold text-center">A team work makes the most.</h5>
          <p className="text-center">meet the  team of Paradise Motors Nepal</p>
        </div>


        <div className="row pt-3">

          <div className="col-md-4 user-card text-center">
            <img
              src="/assets/images/users/user-1.png"
              className="m-auto" height="300"
            />
            <h5 className="mt-2 fw-bold">Bishnu Bhakta Adhikari</h5>
            <p>into-description</p>
          </div>

          <div className="col-md-4 user-card text-center">
            <img
              src="/assets/images/users/user-1.png"
              className="m-auto" height="300"
            />
            <h5 className="mt-2 fw-bold">Sailendra Gautam</h5>
            <p>into-description</p>
          </div>

          <div className="col-md-4 user-card text-center">
            <img
              src="/assets/images/users/user-1.png"
              className="m-auto" height="300"
            />
            <h5 className="mt-2 fw-bold">Hari Bikram Budathoki</h5>
            <p>into-description</p>
          </div>

        </div>


      </div>
    </div>
  );
}

export default TeamsPage;