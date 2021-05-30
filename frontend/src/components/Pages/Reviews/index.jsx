import React from "react";
import { Pagination } from "react-bootstrap";


const pagePrevBtn = React.forwardRef(({ children, onClick }, ref) => (
  <button className="btn">Prev</button>
));
const pageNextBtn = React.forwardRef(({ children, onClick }, ref) => (
  <button className="btn">Next</button>
));

const ReviewsPage = () => {

  document.title = 'Reviews | Paradise Motors Nepal';

  return (
    <div className="container pt-5">

      {['One', 'Two', 'Three'].map((i) => {
        return (
          <div className="d-flex justify-content-between align-items-center mb-4">
            <img src="/assets/images/users/user-1.png" style={{ height: 190, width: 190, objectFit: 'cover' }} height="200" className="rounded-circle" alt="" />
            <div>
              <h4>Client {i}</h4>
              <p>2011 model ford-festa looks like brand new after System X Diamond Coating.</p>
            </div>
            <img src="/assets/images/image-3.png" style={{ height: 200, width: 300 }} alt="" />
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
