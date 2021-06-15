import { Link } from "react-router-dom";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";


const Clients = () => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };



  const [data, setData] = useState([])
  const viewReviewss= async()=>{
    try {
        const res=await fetch('/getReview',{
            method:"GET",
            headers:{ Accept: "application/json",
            "Content-Type": "application/json",},
            credentials: "include",
        })
        const data= await res.json();
       setData(data);
        console.log(data);
        if(!res.status===200){
            const error=new Error(res.error);
            throw error;
        }
        else{
            console.log(data)
        }
    } catch (error) {
        throw error;
    }
}
useEffect(() => {
 viewReviewss();
}, [])

  return (
    <>
      <div class="bg-white clients">
        <div class="container py-4 text-center">
          <h2 class="text-color-1 fw-bold mb-3">Happy Clients</h2>

          {/* <Slider {...sliderSettings} className="mt-4">
            {[0, 1, 2, 6, 7].map((i) => {
              return (
                <div className="col-lg-3">
                  <img
                    src="https://via.placeholder.com/160"
                    alt="clientimage"
                    className="rounded-circle m-auto" height="160"
                  />
                  <h4 className="mt-2">KIA Sportage</h4>
                  <p>Best in class coating and a healthy work</p>
                </div>
                  );
                })}
              </Slider> */}

{/* 
{/*remove comment to make slider dyanamic */}
<div className="row">
<Slider {...sliderSettings} className="mt-4">
{data.map((val,j) => {

  return (
   

<div className="col-lg-3">


                  <img
                    src={`/assets/images/${val.clientImage}`}
                    className="rounded-circle m-auto" height="160"
                  />
                  <h4 className="mt-2">{val.clientName}</h4>
                  <p >{val.customerReview}</p>
                  </div>

                
              );
  })}
            </Slider>
</div>


           
          




          <Link to="/reviews" class="btn-link fw-bold">
            Read reviews from our Clients
          </Link>
        </div>
      </div>
    </>
  );
};

export default Clients;
