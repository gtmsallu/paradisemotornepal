import { Pagination } from "react-bootstrap";
import { usePagination, useTable } from "react-table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



const Table = ({ columns, data, viewReview }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        pageOptions,
        gotoPage,
        state: { pageIndex }
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
    },
        usePagination);

        useEffect(() => {
           viewReview();
        }, [])


        const dltReview= async (id)=>{
            try {
                const res= await fetch("/dltReview/"+id,{
                    method:"DELETE",
                    headers:{"content-type":"application/json"},
                })
                const data= await res.json();
                if(!data || res.status===401){
                    toast.warn("cant be deletey.",{position: "top-center"});

                    
                }else{
                    toast.success("Review is deleted succesfully.",{position: "top-center"});

                }
            } catch (error) {
                console.log(error)
            }
            finally{
                viewReview();
            }

        }

    return (
        <>
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
                                    // console.log(cell.row.original)

                                    // console.log(cell.row.original.carImage)
                                    if (cell.column.id === 'carImage')
                                        return <td {...cell.getCellProps()}>
                                            <img src={`/assets/images/${cell.row.original.carImage}`} alt="" className="img-fluid" style={{width: 250}} />
                                             </td>
                                    else if(cell.column.id === 'clientImage')
                                    return <td {...cell.getCellProps()}>
                                    <img src={`/assets/images/${cell.row.original.clientImage}`} alt="" className="img-fluid" style={{width: 250}} />
                                     </td>
                                     else
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                                
                                <td><button className="btn float-end me-5 btn-rounded btn-danger" onClick={()=>dltReview(row.original._id)}>Delete</button></td>
                            </tr>

                        );
                    })}
                </tbody>
            </table>

            <div>
                <Pagination>
                    <Pagination.Prev onClick={previousPage} disabled={!canPreviousPage} />
                    {pageOptions.map((i) => { return <Pagination.Item active={i === pageIndex} onClick={() => gotoPage(i)}>{i + 1}</Pagination.Item> })}
                    <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                </Pagination>
            </div>

        </>
    );

}



const ViewReview = () => {
    const columns = [
        { Header: 'Client Image', accessor: 'clientImage' },
        { Header: 'Customer Name', accessor: 'customerName' },
        { Header: 'Car Image', accessor: 'carImage' },
        { Header: 'Review', accessor: 'customerReview' },
    ];

    const [data, setData] = useState([])


const viewReview= async()=>{
    try {
        const res=await fetch('/getReview',{
            method:"GET",
            
            credentials: "include",
        })
        const data= await res.json();
       setData(data)
        if(!res.status===200){
            const error=new Error(res.error);
            throw error;
        }
        else{
            console.log("sucess")
        }
    } catch (error) {
        throw error;
    }
}

    return (
        <>
            <div className="col-lg-10 col-md-10 mx-auto">
                <Table columns={columns} data={data} viewReview={viewReview}/>
            </div>

        </>
    );
}

export default ViewReview;