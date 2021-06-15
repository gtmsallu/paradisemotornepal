import { useEffect, useState } from "react";
import { usePagination, useTable } from "react-table";
import { toast } from "react-toastify";
const Table = ({ columns, data, getTeams }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
    },
        usePagination);

        useEffect(() => {
            getTeams();
        }, [])



//         const editTeam=async(id)=>{
// try {
    
// } catch (error) {
//     console.log(error);
// }
//         }

        const dltTeam= async (id)=>{
            try {
                const res= await fetch("/dltTeam/"+id,{
                    method:"DELETE",
                    headers:{"content-type":"application/json"},
                })
                const data= await res.json();
                if(!data || res.status===401){
                    toast.warn("cant be delete.",{position: "top-center"});

                }else{
                    toast.success("Team is deleted succesfully.",{position: "top-center"});

                }
            } catch (error) {
                console.log(error)
            }
            finally{
                getTeams();
            }

        }

    return (
        <>
            <h4 className="fw-bold">Can only add upto 6 members</h4>
            <table class="table table-hover" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                            <th scope="col" style={{ maxWidth: '10%' }}></th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>

                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    // console.log(cell.row.original.image)
                                    // console.log(cell.column.id)
                                    if (cell.column.id === 'image')
                                        return <td {...cell.getCellProps()}>
                                            <img src={`/assets/images/${cell.row.original.image}`} alt="" className="img-fluid" style={{ width: 120 }} />
                                        </td>
                                    else
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}

                                {/* <td><button className="btn btn-sm float-end me-5 btn-rounded btn-dark" onClick={()=>editTeam(row.original._id)}>Edit  </button></td> */}
                                <td><button className="btn btn-sm float-end me-5 btn-rounded btn-danger" onClick={()=>dltTeam(row.original._id)}>Delete</button></td>

                            </tr>

                        );
                    })}
                </tbody>
            </table>

        </>
    );

}

const ViewTeam = () => {
    const columns = [      
        { Header: 'Image', accessor: 'image' },
        { Header: 'Name', accessor: 'name' },

        { Header: 'Description', accessor: 'description' },

    ];


    const [data, setData] = useState([]);

    const getTeams= async()=>{
        try {
            const res=await fetch('/getTeams',{
                method:"GET",
               
            })
            const data= await res.json();
           setData(data);
            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
            else{
                console.log("team displayed")
            }
        } catch (error) {
            throw error;
        }
    }
    
    
       
    return (
        <>
            <div className="col-lg-10 col-md-10 mx-auto">
                <Table columns={columns} data={data} getTeams={getTeams} />
             

            </div>
            


        </>
    );
}

export default ViewTeam;
