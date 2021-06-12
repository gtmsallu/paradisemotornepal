import { useState } from "react";
import {  useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddReview = () => {
const history= useHistory();

    const [clientImage, setClientImage] = useState("");
    const [carImage, setCarImage] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerReview, setCustomerReview] = useState("");

    const AddReview=async (e)=>{
        try {
            e.preventDefault();
            const formdata=new FormData();
            formdata.append("clientImage", clientImage);
            formdata.append("carImage", carImage);
            formdata.append("customerName", customerName);
            formdata.append("customerReview", customerReview);

            const res= await fetch("/admin/add-review",{
                method: "POST",
                body: formdata,
            })
            const data=await res.json();
            
            if(!data || res.status===401){
                toast.error("pls fill the data.",{position: "top-center"});

            }else if(res.status===200){
                toast.success("Review added sucessfully.",{position: "top-center"});

                history.push("/admin/view-review")

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <form method="POST" encType="multipart/form-data" className="col-8 m-auto mt-4">
                <h5 className="fw-bold">Add Review</h5>
                
                <div className="form-group mb-3">
                    <label htmlFor="clientImage">Client Image</label>
                    <input class="form-control" type="file" id="clientImage"  filename="clientImage" name="clientImage"  onChange={(e)=>{setClientImage(e.target.files[0])}} />
                </div>
                <div classfile="form-group mb-3">
                    <label htmlFor="carImage">Car Image</label>
                    <input class="form-control" type="file" id="carImage"  filename="carImage" name="carImage"  onChange={(e)=>{setCarImage(e.target.files[0])}} />
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