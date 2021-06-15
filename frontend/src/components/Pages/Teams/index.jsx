import React, { useEffect, useState } from "react";
import './teams.css';
// import hh from "../../../images/image-1623258276017.png"
const TeamsPage = () => {
  document.title = 'Our Team | Paradise Motors Nepal';


    const [data, setData] = useState([])
    
    const getTeamData=async ()=>{
      try {
        const res=await fetch('/getTeams',{
            method:"GET",
            headers:{ Accept: "application/json",
            "Content-Type": "application/json",},
        })
        const data1= await res.json();
        setData(data1);
        if(!data || !res.status===200){
            console.log("error")
        }
     
    } catch (error) {
        throw error;
    }
    }
    useEffect(() => {
      getTeamData();
  
    }, [])


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
        
      { data.map((val,i)=> {
          return( <div className="col-md-4 user-card text-center">

          <img
            src={`/assets/images/${val.image}`}
            alt="teamImage"
            className="m-auto" height="300"
          />
          <h5 className="mt-2 fw-bold">{val.name}</h5>
          <p>{val.description}</p>
         </div>
         
         );

        }
        )}
         
        </div>


      </div>
    </div>
  );
}

export default TeamsPage;