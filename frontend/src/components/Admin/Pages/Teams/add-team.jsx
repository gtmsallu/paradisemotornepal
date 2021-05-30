import { Link } from "react-router-dom";

const AddTeam = () => {
    return (
        <>

            <form className="col-8 m-auto mt-4">
                <h5 className="fw-bold">Add Team</h5>

                <span className="text-blue">Can only add upto 6 members (Check <Link to="/admin/view-team">View Teams</Link> to see your List)</span>

                <div className="form-group mb-3">
                    <label htmlFor="inputImage">Image</label>
                    <input class="form-control" type="file" id="inputImage"/>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="form-control" placeholder="" />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="carName">Description</label>
                    <textarea type="text" id="carName" className="form-control" placeholder="" />
                </div>


                <button className="btn btn-secondary app_btn_1 float-end">Add Team</button>

            </form>

        </>
    );
}

export default AddTeam;