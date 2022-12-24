import React, {  useState } from "react";
import { useHistory } from "react-router";
import { toast } from 'react-toastify';

import './contact.css';

const ContactPage = () => {
  const history= useHistory();
  document.title = 'Contact | Paradise Motors Nepal';
  const [userData, setuserData] = useState({name:"",email:"",phone:"",address:"",message:""})
  let name, value;

const inputValue=(e)=>{
  name=e.target.name;
  value=e.target.value;
  setuserData({...userData,[name]:value});
}
const postMessage=async(e)=>{
  try {
    e.preventDefault();
    const{name,email,phone,address,message}=userData;
    const res = await fetch('/contact',{
      method:"POST",
      headers:{
       "Content-Type":"application/json"
  
  },body: JSON.stringify({
    name,
    email,
    phone,
    address,
    message,
    
  }),
    });
    const data= await res.json();
    if (res.status === 401 || !data) {
      toast.warn("Pls fill the contact form",{position: "top-center"});
    } else {
      toast.success("Message has been sent sucessfully",{position: "top-center"});
     history.push("/")
    }
  } catch (error) {
    console.log(error);
  } 
 


}
  return (
    <div className="container">
      <div className="row text-white mx-0 my-3">
        <div className="col-md-4 contact-info_wrapper">
          <div>
            <div>
              <h4 className="fw-bold">Contact Information</h4>
              <p className="">Fill the form and our team will get to you within 24 hrs.</p>
            </div>

            <div className="contact-info">
              <div class="d-flex align-items-center mb-1">
                <i class="fa fa-map-marker-alt me-1"></i>
                <p class="ms-2 m-0">
                  Rakshya Marg, near TATA Motors <br />
                      Pokhara, Nepal
                    </p>
              </div>
              <div class="d-flex align-items-center mb-1">
                <i class="fa fa-phone-alt"></i>
                <p class="ms-2 m-0">+977- 9856015947</p>
              </div>
              <div class="d-flex align-items-center mb-2">
                <i class="fa fa-envelope"></i>
                <p class="ms-2 m-0">paradisemotorsnepal777@gmail.com</p>
              </div>
            </div>


            <div className="social_link">
              <a href="https://www.facebook.com/paradisemotornepal">
                <i class="fab fa-facebook-square"></i></a>
              <a href="https://www.instagram.com/paradisemotorsnepal">
                <i class="fab fa-instagram"></i>
              </a>
            </div>

          </div>
        </div>


        <div className="col-md-7 ms-md-4">

          <form method="POST" className="contact-form px-lg-4 py-3">
            <div className="form-group">
              <label htmlFor="inputName" className="form-label">Name</label>
              <input type="text" id="inputName"   className="form-control" name="name" onChange={inputValue} value={userData.name} placeholder="Your Name Here" required />
            </div>
            <div className="form-group">
              <label htmlFor="inputPhone">Phone</label>
              <input type="number" id="inputPhone" className="form-control" name="phone" onChange={inputValue} value={userData.phone} placeholder="+977-xxxxxxxxxx" required/>
            </div>

            <div className="form-group">
              <label htmlFor="inputEmail">Mail</label>
              <input type="email" id="inputEmail" className="form-control" name="email" onChange={inputValue} value={userData.email} placeholder="someone@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="inputAddress">Address (optional)</label>
              <input type="text" id="inputAddress" className="form-control" name="address" onChange={inputValue} value={userData.address} placeholder="Your address here" />
            </div>

            <div className="form-group">
              <label htmlFor="inputMessage">Message</label>
              <textarea name="message" id="inputMessage"  className="form-control" rows="3" name="message" onChange={inputValue} value={userData.message} placeholder="write your message here..." required></textarea>
            </div>

            <button className="btn mt-3 px-4" name="submit" value="submit" onClick={postMessage}>Send Message</button>

          </form>

        </div>
      </div>
    </div>);
}

export default ContactPage;