import React, { useEffect, useState } from 'react';

import { Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { sideMenus } from './sidemenu';

import { Modal } from 'react-bootstrap';

const AdminHeader = () => {
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
                            <Dropdown.Item>
                                <i className="fa fa-sign-out-alt"></i> Logout
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
                            <input type="email" id="inputEmail" className="form-control" placeholder="someone@example.com" />
                        </div>

                        <div className="form-group mt-3">
                            <label htmlFor="inputPassword">Enter your new Email</label>
                            <input type="email" id="inputPassword" className="form-control" placeholder="newmail@example.com" />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="inputPassword">Confirm your new Email</label>
                            <input type="email" id="inputPassword" className="form-control" placeholder="newmail@example.com" />
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