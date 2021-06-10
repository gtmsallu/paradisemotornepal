import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Works = () => {



   

        const [data, setData] = useState([])
        const getWorkData=async ()=>{
          try {
            const res=await fetch('/getWork',{
                method:"GET",
                headers:{ Accept: "application/json",
                "Content-Type": "application/json",},
            })
            const data1= await res.json();
            setData(data1);
            if(!data || !res.status===200){
                console.log("error")
            }
           
        } catch (error) {
            throw error;
        }
        }
        useEffect(() => {
          getWorkData();
      
        }, [])

    return (
      <>
      
      <div class="bg-white our-works">
            <div class="container py-5 text-center">
                <h2 class="text-color-1 fw-bold mb-3">Our Works</h2>
                <div class="row">
                    {data.map((val,i) => {
                        return (
                            <div class="col-md-6 overflow-hidden mb-4" key={i}>
                            <img class="w-100 rounded-2" height="350" src={`/assets/images/${val.carimage}`} alt=""/>
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