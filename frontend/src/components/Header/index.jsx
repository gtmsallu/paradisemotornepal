
import React, { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

import { Link, NavLink, useHistory } from "react-router-dom";
import {UserContext} from "../../MainRouter";
import './header.css';

const Header = () => {

  const {state, dispatch} = useContext(UserContext);

  const history=useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const postLogin=async (e)=>{
    e.preventDefault();
    
    const res=await fetch("/login",{
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const data= await res.json;
    console.log(data);
    if(!data|| res.status===401){
      toast.warn("plse fill credentials",{position: "top-center"})
      console.log("plse fill credentials")
    }else if (res.status===400){
      toast.error("credential doesnt match",{position: "top-center"})
      console.log("credential doesnt match");
      history.push("/");


    }else{
      console.log("You have been loged in")
      dispatch({type:"USER", payload: true})
      history.push("/");
      toast.success("You have been loged in",{position: "top-center"})

    }
  }

  // logout
  const handleLogout=async (e)=>{
    e.preventDefault();
    
    const res= await fetch("/logout",{
      method: "POST",
      headers:{"content-type":"application/json"},
      
  })
  const data=await res.json();
  if(!data || res.status===400){
      toast.error("logout problem",{position: "top-center"});
  }else{
    dispatch({type:"USER", payload: false})

      toast.success("Logout successfully. Thank you!!!",{position: "top-center"});
          history.push("/")
  
  
  }
  }

const RenderMenu=()=>{
  {
    console.log(state)
    if(state){
    return(
      <div>
      <button type="button" class="btn account-btn me-2" onClick={handleLogout}>
        {/* <img
        height="20"
        class="icon mr-1"
        src="assets/account.svg"
        alt=""
      /> */}
        <i className="far fa-user-circle me-2"></i>
        Log Out
      </button>
    </div>)
    
    
    ;
   
  }else{
    return(<div>
      <button type="button" class="btn account-btn me-2" onClick={handleShow}>
        {/* <img
        height="20"
        class="icon mr-1"
        src="assets/account.svg"
        alt=""
      /> */}
        <i className="far fa-user-circle me-2"></i>
        Login
      </button>
     </div>)
  }}
}


  return (
    <>
      <header class="navbar fixed-top navbar-expand-lg justify-content-center justify-content-md-between py-3 mb-4">
        <div class="container">
          <Link
            to="/"
            class="brand d-flex align-items-center mb-2 mb-md-0 text-dark text-decoration-none"
          >
            <img src="/logo.png" alt="" />
            <div class="brand-text">
              PARADISE
              <span class="d-block">MOTORS NEPAL</span>
            </div>
          </Link>

          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav navbar-nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 m-auto">
              {/* <li>
                <Link t="/home" class="nav-link px-2 link-light">
                  Home
                </Link>
              </li> */}
              
              <li class="nav-link px-2 link-light">
                <NavLink to="/works">
                  Works
                </NavLink>
              </li>
              <li class="nav-link px-2 link-light">
                <NavLink to="/teams">Teams</NavLink>
              </li>
              <li class="nav-link px-2 link-light">
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
        <RenderMenu />
           
           
          </div>
        </div>
      </header>
      <form method="POST">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5 className="fw-bold m-auto"> Login</h5>
        </Modal.Header>
        <Modal.Body>

          
            <div className="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input type="email" id="inputEmail" className="form-control" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="someone@example.com" />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="inputPassword">Password</label>
              <input type="password" id="inputPassword" className="form-control" name="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="*****" />
            </div>

          

        </Modal.Body>
        <Modal.Footer className="pb-4">
          <button className="btn btn-dark px-5 m-auto modal_btn" name="submit" value="submit" onClick={postLogin}> Login</button>
        </Modal.Footer>
      </Modal>
      </form>

      <ToastContainer />
          
    </>
  );
};

export default Header;
