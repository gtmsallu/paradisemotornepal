
const AddWork = () => {
    return (
        <>

            <form className="col-8 m-auto mt-4">
                <h5 className="fw-bold">Add Work</h5>

                <div className="form-group mb-3">
                    <label htmlFor="inputImage">Image</label>
                    <input class="form-control" type="file" id="inputImage"/>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="carName">Car Name</label>
                    <input type="text" id="carName" className="form-control" placeholder="" />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="carName">Description</label>
                    <textarea type="text" id="carName" className="form-control" placeholder="" />
                </div>


                <button className="btn btn-secondary app_btn_1 float-end">Add Work</button>

            </form>

        </>
    );
}

export default AddWork;