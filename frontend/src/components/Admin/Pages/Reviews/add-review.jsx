import { Link } from "react-router-dom";

const AddReview = () => {
    return (
        <>

            <form className="col-8 m-auto mt-4">
                <h5 className="fw-bold">Add Review</h5>
                
                <div className="form-group mb-3">
                    <label htmlFor="clientImage">Client Image</label>
                    <input class="form-control" type="file" id="clientImage"/>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="carImage">Car Image</label>
                    <input class="form-control" type="file" id="carImage"/>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="custName">Customer Name</label>
                    <input type="text" id="custName" className="form-control" placeholder="" />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="review">Write the review here</label>
                    <textarea type="text" id="review" className="form-control" placeholder="" />
                </div>


                <button className="btn btn-secondary app_btn_1 float-end">Add Review</button>

            </form>

        </>
    );
}

export default AddReview;