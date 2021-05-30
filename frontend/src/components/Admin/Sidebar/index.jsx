import { Link } from "react-router-dom";

import './sidebar.css';

const Sidebar = () => {
    return (
        <>

            <div class="flex-shrink-0 p-3 bg-white a_sidebar" style={{ width: 260 }}>
                <Link to="/admin" class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom">
                    {/* <svg class="bi me-2" width="30" height="24"><use xlink:href="#bootstrap"></use></svg> */}
                    <img src="/logo.png" height="30" alt="" />
                    <span class="fw-semibold" style={{fontSize: '1.5rem'}}>Admin Panel</span>
                </Link>
                <ul class="list-unstyled ps-0 as_">
                    <li class="mb-1">
                        <span class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#request-collapse" aria-expanded="true">
                            Requests
        </span>
                        <div class="collapse" id="request-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="/admin/requests" class="link-dark rounded">Pull Requests</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <span class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#contact-collapse" aria-expanded="false">
                            Contact
        </span>
                        <div class="collapse" id="contact-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="/admin/messages" class="link-dark rounded">Messages</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <span class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#works-collapse" aria-expanded="false">
                            Works
        </span>
                        <div class="collapse" id="works-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="/admin/add-work" class="link-dark rounded">Add Work</Link></li>
                                <li><Link to="/admin/view-work" class="link-dark rounded">View Work</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <span class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#teams-collapse" aria-expanded="false">
                            Teams
        </span>
                        <div class="collapse" id="teams-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="/admin/add-team" class="link-dark rounded">Add Team</Link></li>
                                <li><Link to="/admin/view-team" class="link-dark rounded">View Team</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="mb-1">
                        <span class="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#reviews-collapse" aria-expanded="false">
                            Reviews
        </span>
                        <div class="collapse" id="reviews-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><Link to="/admin/add-review" class="link-dark rounded">Add Review</Link></li>
                                <li><Link to="/admin/view-review" class="link-dark rounded">View Review</Link></li>
                            </ul>
                        </div>
                    </li>
                    {/* <li class="border-top my-3"></li> */}
                    <li className="subs btn-toggle-nav mb-5 fw-bold">
                        <Link to='/admin/subscribers' class="link-dark m-auto rounded">Subscribers</Link>
                    </li>




                </ul>
            </div>

        </>
    );
}

export default Sidebar;