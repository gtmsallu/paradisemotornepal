import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddTeam = () => {
    const history=useHistory();
    const [image, setImage] = useState("");
const [name, setName] = useState("");
const [description, setDescription] = useState("");

const addTeams=async (e)=>{
    e.preventDefault();
const formData= new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);



const res=await fetch("/admin/add-team",{
   method:"POST",
body:formData,
})
const data=await res.json();
if(!data || res.status===401){
    console.log("plse fill data");
    toast.warn("plse fill data",{position: "top-center"});

}else{
    console.log("team is successfully added");
    toast.success("Team is successfully added.",{position: "top-center"});
    history.push("/admin/view-team");
}
}
    return (
        <>

            <form method="POST" encType="multipart/form-data" className="col-8 m-auto mt-4">
                <h5 className="fw-bold">Add Team</h5>

                <span className="text-blue">Can only add upto 6 members (Check <Link to="/admin/view-team">View Teams</Link> to see your List)</span>

                <div className="form-group mb-3">
                    <label htmlFor="inputImage">Image</label>
                    <input class="form-control" type="file" filename="image" name="image" onChange={(e)=>{setImage(e.target.files[0])}}  id="inputImage"/>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}}  id="name" className="form-control" placeholder="" />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="carName">Description</label>
                    <textarea type="text" name="description" value={description} onChange={(e)=>{setDescription(e.target.value)}}  id="carName" className="form-control" placeholder="" />
                </div>


                <button className="btn btn-secondary app_btn_1 float-end" name="submit" value="submit" onClick={addTeams}>Add Team</button>

            </form>

        </>
    );
}

export default AddTeam;