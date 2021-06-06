import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { usePagination, useTable } from "react-table";

import { getWorkData } from "../../fakeData";


const Table = ({ columns, data, ViewWork }) => {
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
            ViewWork();
        }, [])

        const dltWorks=async(id)=>{
try {
    const res=await fetch("/dltWorks/"+id,{
        method:"DELETE",
        headers:{"content-type":"application/json"},
    })
    const data= await res.json();
    if(!data || res.status===401){
        window.alert("cant be delete");
    }else{
        window.alert("Work is deleted succesfully")
    }

} catch (error) {
    console.log(error)
}finally{
ViewWork();
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
                                    if (cell.column.id === 'image')
                                        return <td {...cell.getCellProps()}>
                                            <img src={cell.value} alt="" className="img-fluid" style={{width: 250}} />
                                             </td>
                                    else
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
                                
                                <td><button className="btn btn-sm float-end me-5 btn-rounded btn-danger" name="submit" value="submit" onClick={()=>dltWorks(row.original._id)} >Delete</button></td>
                            </tr>

                        );
                    })}
                </tbody>
            </table>

            <div>
                <Pagination>
                    <Pagination.Prev onClick={previousPage} disabled={!canPreviousPage} />
                    {pageOptions.map((i) => { return <Pagination.Item active={i == pageIndex} onClick={() => gotoPage(i)}>{i + 1}</Pagination.Item> })}
                    <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                </Pagination>
            </div>

        </>
    );

}

const ViewWork = () => {
    const columns = [
        { Header: 'Car Name', accessor: 'carName' },
        { Header: 'Image', accessor: 'image' },
        { Header: 'Description', accessor: 'description' },
        { Header: 'Date', accessor: 'date' }

    ];

const [data, setData] = useState([])
    const ViewWork= async()=>{
        try {
            const res=await fetch('/getWork',{
                method:"GET",
                headers:{ Accept: "application/json",
                "Content-Type": "application/json",},
            })
            const data= await res.json();
           setData(data)
            console.log(data);
            if(!res.status===200){
                const error=new Error(res.error);
                throw error;
            }
            else{
                console.log(data)
            }
        } catch (error) {
            throw error;
        }
    }
  
    return (
        <>
            {/* <h5 className="fw-bold">Messages</h5> */}
            <div className="col-lg-10 col-md-10 mx-auto">
                <Table columns={columns} data={data} ViewWork={ViewWork} />
            </div>

        </>
    );
}

export default ViewWork;