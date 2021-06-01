import React, { useEffect, useState } from 'react';

import { Dropdown } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { sideMenus } from './sidemenu';

import { Modal } from 'react-bootstrap';

const AdminHeader = () => {

const [oldEmail, setOldEmail] = useState("");
const [newEmail, setNewEmail] = useState("");
const [reEmail, setReEmail] = useState("");



    const history= useHistory();
   const logOut=async(e)=>{
e.preventDefault();
const res= await fetch("/logout",{
    method: "POST",
    headers:{"content-type":"application/json"},
    
})
const data=await res.json();
if(!data || res.status===400){
    window.alert("logout problem");
}else{
    window.alert("Admin logout successfull")
    history.push("/")

}
   }


   const adminProfile=async()=>{
        try {
          const res = await fetch("/getadmindata", {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          });
          const data = await res.json();
          setOldEmail( data.email);
    
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
        } catch (error) {
          console.log(error);
        }
      };
   

  useEffect(() => {
    adminProfile();
  }, [])



    const location = useLocation();

    const currentPage = sideMenus.filter((item) => item.url == (location.pathname).replace(/^\/|\/$/g, ''))[0];



    const [emailModal, setEmailModal] = useState(false);
    const closeEmailModal = () => setEmailModal(false);
    const showEmailModal = () => setEmailModal(true);

    const [passwordModal, setPasswordModal] = useState(false);
    const closePasswordModal = () => setPasswordModal(false);
    const showPasswordModal = () => setPasswordModal(true);
    return (
        <>
            <header className="admin_header_ bg-light position-fixed top-0 p-3 border-0">
                <div className="container d-flex flex-wrap ">
                    <h4 className="me-lg-auto fw-bold" id="cPage">{currentPage?.name || 'Pull Requests'}</h4>
                    <Dropdown className="account__">
                        <Dropdown.Toggle className="account-btn_ bg-secondary rounded-circle" id="dropdown-basic">
                            <i className="fa fa-user"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={showEmailModal}>
                                <i className="fa fa-envelope"></i> Change email
                            </Dropdown.Item>
                            <Dropdown.Item onClick={showPasswordModal}>
                                <i className="fa fa-lock"></i> Change password
                            </Dropdown.Item>
                            <hr className="dropdown-divider" />
                            <Dropdown.Item as="button" onClick={logOut}  >
                               <i className="fa fa-sign-out-alt"   ></i> Logout
                            </Dropdown.Item>



                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>

            {/* change email modal */}
            {/* {change password modal} */}


            <Modal show={emailModal} onHide={closeEmailModal}>
                <Modal.Header closeButton>
                    <h5 className="fw-bold m-auto">Update Email</h5>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Enter your old Email</label>
                            <input type="email" id="inputEmail" className="form-control" name="oldEmail" value={oldEmail} onChange={(e)=>setOldEmail(e.target.value)} placeholder="someone@example.com" required />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="inputPassword">Enter your new Email</label>
                            <input type="email" id="inputPassword" className="form-control" name="newEmail" value={newEmail} onChange={(e)=>setNewEmail(e.target.value)} placeholder="newmail@example.com" required />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="inputPassword">Confirm your new Email</label>
                            <input type="email" id="inputPassword" className="form-control" name="reEmail" value={reEmail} onChange={(e)=>setReEmail(e.target.value)} placeholder="newmail@example.com" required/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className="pb-4">
                    <button className="btn btn-dark px-5 m-auto app_btn_1">Update</button>
                </Modal.Footer>
            </Modal>

            {/* change password modal */}

            <Modal show={passwordModal} onHide={closePasswordModal}>
                <Modal.Header closeButton>
                    <h5 className="fw-bold m-auto"> Change Password</h5>
                </Modal.Header>
                <Modal.Body>

                    <form>
                        <div className="form-group">
                            <label htmlFor="oldPassword">Old Password</label>
                            <input type="password" id="oldPassword" className="form-control" placeholder="*****" />
                        </div>


                        <div className="form-group">
                            <label htmlFor="newPass">New Password</label>
                            <input type="password" id="newPass" className="form-control" placeholder="*********" />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="confirmNewPass">Confirm Password</label>
                            <input type="password" id="confirmNewPass" className="form-control" placeholder="*********" />
                        </div>

                    </form>


                </Modal.Body>
                <Modal.Footer className="pb-4">
                    <button className="btn btn-dark px-5 m-auto app_btn_1"> Update</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AdminHeader;