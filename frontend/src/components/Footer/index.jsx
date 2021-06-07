import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Footer = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [subscribeMail, setsubscribeMail] = useState("");

const postSubscribeMail= async(e)=>{
  console.log(subscribeMail);
  e.preventDefault();
const res=await fetch("/mail",{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
  },
  body: JSON.stringify({ subscribeMail}),
}) 
const data= await res.json();
if(!data || res.status===402){
  toast.warn("plse fill the mail",{position: "top-center"});


}else if(res.status===422){
  toast.warn("your mail was already registered try new one",{position: "top-center"});

}else{

  toast.success("you have been subscribed, thank you vistis again..",{position: "top-center"});

}
}
  return (
    <>
      <footer class="py-3 text-white">
        <div class="container">
          <div class="row pt-3">
            <div class="col-md-8">
              <div class="row mb-md-4">
                <div class="brand d-flex">
                  <img src="/logo.png" alt="" />
                  <div class="brand-text">
                    PARADISE
                    <span class="d-block">MOTORS NEPAL</span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-7 mt-lg-4">
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
                <div class="col-md-5 mt-lg-4">
                  <h6 class="fw-bold">Links</h6>
                  <div class="links_ mb-2">
                    <Link to="/privacy">Privacy Policy</Link>
                    <a onClick={handleShow} href="#/">
                      Subscribe for Newsletter
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <h6 class="fw-bold">Find us on</h6>
              <div class="social_">
                <a href="https://www.facebook.com/paradisemotornepal">
                  <i class="fab fa-facebook-square"></i>
                </a>
                <a href="https://www.instagram.com/paradisemotorsnepal/">
                  <i class="fab fa-instagram"></i>
                </a>
              </div>
              <div class="mt-2 text-center">
                <iframe
                  title="find-on-map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.01268136886!2d83.996827!3d28.2069273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995956a9c6b9e37%3A0x850e2fbb3fead6ee!2sParadise%20Motors%20Nepal!5e0!3m2!1sen!2snp!4v1621939168400!5m2!1sen!2snp"
                  width="100%"
                  style={{ height: "260px", border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <p class="text-center text-white">© Paradise Motors Nepal 2021</p>
        <p class="text-center text-white">
          Designed & Developed By <b> WalkDigital Soft.</b>{" "}
        </p>
      </footer>
      
      <form method="POST">

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5
            className="fw-bold m-auto text-center px-3"
            style={{ color: "#005A8A" }}
          >
            Subscribe to our mailing list and get updates from us
          </h5>
        </Modal.Header>
        <Modal.Body>
            <div className="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input
                type="email"
                id="inputEmail"
                name="subscribeMail"
                value={subscribeMail}
                onChange={(e)=>{setsubscribeMail(e.target.value)}}
                className="form-control"
                placeholder="someone@example.com"
                required
              />
            </div>
        </Modal.Body>
        <Modal.Footer className="pb-4">
          <button
            className="btn btn-dark px-5 m-auto modal_btn" value="submit" name="submit" onClick={postSubscribeMail}
          >
            Subscribe
          </button>
        </Modal.Footer>
      </Modal>
      </form>

    </>
  );
};

export default Footer;
