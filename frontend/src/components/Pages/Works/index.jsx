import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

import './works.css';

const pagePrevBtn = React.forwardRef(({ children, onClick }, ref) => (
  <button className="btn">Prev</button>
));
const pageNextBtn = React.forwardRef(({ children, onClick }, ref) => (
  <button className="btn">Next</button>
));

const WorksPage = () => {

  const [data, setData] = useState([])
  const getWorkData=async ()=>{
    try {
      const res=await fetch('/getWork',{
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
    getWorkData();

  }, [])
  useEffect(() => {
    const bodyClassList = document.body.classList;
    const bodyBg = bodyClassList.contains("bg-white");
    if (!bodyBg) {
      bodyClassList.add("bg-white");
    }
  });
  
  document.title = 'Our Works | Paradise Motors Nepal';

  return (
    <>
      <div className="container col-xxl-8">
       { data.map((get, i)=>{
                return(<div class="row align-items-center g-5 py-5  w-item">
                <div class="col-10 col-sm-8 col-lg-6">
                  <img
                    src={`/assets/images/${get.carimage}`}
                    alt="carimage"
                    class="d-block mx-lg-auto img-fluid"
                    loading="lazy"
                  />
                </div>
                <div class="col-lg-6">
                  <h4 class="fw-bold lh-1 mb-3">{get.carName}</h4>
                  <p class="lead">
                   {get.description}
                  </p>
                </div>
               </div>)  
 })}
        <div>
          <Pagination>
            <Pagination.Prev as={pagePrevBtn} />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Item active>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>

            <Pagination.Next as={pageNextBtn} />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default WorksPage;
