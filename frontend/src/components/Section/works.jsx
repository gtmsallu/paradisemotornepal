import { Link } from "react-router-dom";

const Works = () => {
    return (
      <>
      
      <div class="bg-white our-works">
            <div class="container py-5 text-center">
                <h2 class="text-color-1 fw-bold mb-3">Our Works</h2>
                <div class="row">
                    {[0,1,2,6].map((i) => {
                        return (
                            <div class="col-md-6 overflow-hidden mb-4" key={i}>
                            <img class="w-100 rounded-2" height="350" src="/assets/images/image-1.png" alt=""/>
                        </div>
                        )
                    })}
                </div>
                <Link to="/works" class="btn btn-dark px-4 border-0">View All</Link>

            </div>
        </div>
      </>)

    }

    export default Works;