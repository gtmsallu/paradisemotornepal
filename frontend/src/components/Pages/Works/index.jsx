import React, { useEffect } from "react";
import { Pagination } from "react-bootstrap";

import './works.css';

const pagePrevBtn = React.forwardRef(({ children, onClick }, ref) => (
  <button className="btn">Prev</button>
));
const pageNextBtn = React.forwardRef(({ children, onClick }, ref) => (
  <button className="btn">Next</button>
));

const WorksPage = () => {
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

        <div class="row align-items-center g-5 py-5  w-item">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="/assets/images/image-1.png"
              class="d-block mx-lg-auto img-fluid"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6">
            <h4 class="fw-bold lh-1 mb-3">Ford-Festa</h4>
            <p class="lead">
              2011 model ford-festa looks like brand new after System X Diamond
              Coating.
            </p>
          </div>
        </div>

        <div class="row align-items-center g-5 py-5 w-item">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="/assets/images/image-1.png"
              class="d-block mx-lg-auto img-fluid"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6">
            <h4 class="fw-bold lh-1 mb-3">Ford-Festa</h4>
            <p class="lead">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world’s most popular front-end open source toolkit.
            </p>
          </div>
        </div>

        <div class="row align-items-center g-5 py-5 w-item">
          <div class="col-10 col-sm-8 col-lg-6">
            <img
              src="/assets/images/image-1.png"
              class="d-block mx-lg-auto img-fluid"
              loading="lazy"
            />
          </div>
          <div class="col-lg-6">
            <h4 class="fw-bold lh-1 mb-3">Ford-Festa</h4>
            <p class="lead">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world’s most popular front-end open source toolkit.
            </p>
          </div>
        </div>
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
