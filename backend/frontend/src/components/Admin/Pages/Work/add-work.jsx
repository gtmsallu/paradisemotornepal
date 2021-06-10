import { useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const AddWork = () => {

const history=useHistory();
    const [carimage, setImage] = useState("");
    const [carName, setCarName] = useState("");
    const [description, setDescription] = useState("");


    
    const addWork=async (e)=>{
        try {
            e.preventDefault();
            const formData= new FormData();
            formData.append("carimage",carimage);
            formData.append("carName",carName);
            formData.append("description",description);

const res= await fetch("/admin/add-work",{
    method: "POST",
    body: formData,
})
const data=await res.json();
if(!data || res.status===401){
    window.alert("pls fill the data.");
}else if(res.status===200){
    toast.success("work added sucessfully.",{position: "top-center"});

    history.push("/admin/view-work")


}
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>

            <form method="POST" encType="multipart/form-data" className="col-8 m-auto mt-4">
                <h5 className="fw-bold">Add Work</h5>

                <div className="form-group mb-3">
                    <label htmlFor="inputImage">Image</label>
                    <input class="form-control" type="file" id="inputImage" filename="carimage"  onChange={(e)=>{setImage(e.target.files[0])}} />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="carName">Car Name</label>
                    <input type="text" id="carName" className="form-control" placeholder="" name="carName" value={carName} onChange={(e)=>{setCarName(e.target.value)}}/>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" id="description" className="form-control" placeholder="" name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}} />
                </div>


                <button className="btn btn-secondary app_btn_1 float-end" name="submit" value="submit" onClick={addWork}>Add Work</button>

            </form>

        </>
    );
}

export default AddWork;