import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";


const pagePrevBtn = React.forwardRef(({ children, onClick }, ref) => (
  <button className="btn">Prev</button>
));
const pageNextBtn = React.forwardRef(({ children, onClick }, ref) => (
  <button className="btn">Next</button>
));

const ReviewsPage = () => {

  document.title = 'Reviews | Paradise Motors Nepal';
const [data, setData] = useState([])
  const viewReview= async()=>{
    try {
        const res=await fetch('/getReview',{
            method:"GET",
            headers:{ Accept: "application/json",
            "Content-Type": "application/json",},
            credentials: "include",
        })
        const data1= await res.json();
       setData(data1)
        console.log(data1);
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
 viewReview();
}, [])

  return (
    <div className="container pt-5">

      {data.map((review, i) => {
        return (
          <div className="d-flex justify-content-between align-items-center mb-4">
            <img src={`/assets/images/${review.clientImage}`} style={{ height: 190, width: 190, objectFit: 'cover' }} height="200" className="rounded-circle" alt="" />
            <div>
              <h4>{review.customerName}</h4>
              <p>{review.customerReview}</p>
            </div>
            <img src={`/assets/images/${review.carImage}`} style={{ height: 200, width: 300 }} alt="" />
          </div>
        );
      })}

      
          <Pagination className="py-3">
            <Pagination.Prev as={pagePrevBtn} />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>

            <Pagination.Next as={pageNextBtn} />
          </Pagination>
        


    </div>

  );
}

export default ReviewsPage;
