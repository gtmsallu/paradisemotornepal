import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const AddReview = () => {
const history= useHistory();

    const [clientImage, setClientImage] = useState("");
    const [carImage, setCarImage] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerReview, setCustomerReview] = useState("");

    const AddReview=async (e)=>{
        try {
            e.preventDefault();
            const res= await fetch("/admin/add-review",{
                method: "POST",
                headers:{"content-type":"application/json"},
                body: JSON.stringify({ clientImage, carImage, customerName, customerReview}),
            })
            const data=await res.json();
            if(!data || res.status===401){
                window.alert("pls fill the data.");
            }else if(res.status===200){
                window.alert("review added sucessfully.");
                history.push("/admin/view-review")

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <form method="POST" className="col-8 m-auto mt-4">
                <h5 className="fw-bold">Add Review</h5>
                
                <div className="form-group mb-3">
                    <label htmlFor="clientImage">Client Image</label>
                    <input class="form-control" type="file" id="clientImage"  name="clientImage" value={clientImage} onChange={(e)=>{setClientImage(e.target.value)}} />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="carImage">Car Image</label>
                    <input class="form-control" type="file" id="carImage"  name="carImage" value={carImage} onChange={(e)=>{setCarImage(e.target.value)}} />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="custName">Customer Name</label>
                    <input type="text" id="custName" className="form-control" placeholder=""  name="customerName" value={customerName} onChange={(e)=>{setCustomerName(e.target.value)}}  />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="review">Write the review here</label>
                    <textarea type="text" id="review" className="form-control" placeholder=""  name="customerReview" value={customerReview} onChange={(e)=>{setCustomerReview(e.target.value)}} />
                </div>


                <button className="btn btn-secondary app_btn_1 float-end" name="submit" value="submit" onClick={AddReview}>Add Review</button>

            </form>

        </>
    );
}

export default AddReview;