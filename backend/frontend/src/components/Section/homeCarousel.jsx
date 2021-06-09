import { useState } from "react";
import { Carousel } from "react-bootstrap";
import {useHistory} from "react-router-dom";
import { toast } from 'react-toastify';

const HomeCarousel = () => {
  const history=useHistory();

  document.title = 'Paradise Motors Nepal';
const [bookList, setbookList] = useState({name:"",phone:"",carModel:""})


  let name, value;
const inputValue=(e)=>{
  name=e.target.name;
  value=e.target.value;
setbookList({...bookList,[name]:value})
}

const postBooklist=async(e)=>{
e.preventDefault();
const {name, phone, carModel}=bookList;
const res=await fetch("/",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({name, phone,carModel})
})

const data= await res.json();
if (res.status === 422 || !data) {
  toast.warn("Your Booking was not request. Please fill the form",{position: "top-center"});

  console.log("your Booking was not req");
} else {
  toast.success("your Booking was reqested succesfully",{position: "top-center"});
  history.push("/");
 
}
}

  return (
    <>
      <div style={{ height: 500 }} className="home-c">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height="500"
              src="/assets/images/image-1.png"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              height="500"
              src="/assets/images/image-2.png"
            />
          </Carousel.Item>
        </Carousel>
        <div className="container position-relative" >
          <div className="col-md-6 booking-form px-lg-4 px-3 py-3">
            <h6 className="text-center fw-bold">Book coating for your Car Now!!</h6>
            <form method="POST">
              <div className="form-group mb-1">
                <label htmlFor="inputName">Name</label>
                <input type="text" class="form-control" name="name" value={bookList.name} onChange={inputValue}  id="inputName" />
              </div>
              <div className="form-group mb-1">
                <label htmlFor="inputName">Phone</label>
                <input type="text" class="form-control" name="phone" value={bookList.phone} onChange={inputValue} id="inputName" />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="inputName">Car Model</label>
                <input type="text" class="form-control" name="carModel" value={bookList.carModel} onChange={inputValue} id="inputName" />
              </div>
              <button className="btn w-100 btn-secondary btn-book" value="submit" name="submit" onClick={postBooklist}>Request for call</button>
            </form>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default HomeCarousel;
