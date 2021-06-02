import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useHistory } from "react-router";
import { usePagination, useTable } from "react-table";

import { getRequests } from "../../fakeData";


const Table = ({ columns, data }) => {
const history=useHistory();

const adminPage=async()=>{
    try {
        const res = await fetch("/admin", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        
        if (!res.status === 200) {
          window.alert("no token provided");
          
        }
        else{
            history.push("/admin")
        }
      } catch (error) {
        console.log(error);
        history.push("/");
      }
    
};





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
            adminPage();
           
         }, []);

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
                                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}
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

const PullRequests = () => {
    const columns = [
        { Header: 'Name', accessor: 'name' },
        { Header: 'Phone', accessor: 'phone' },
        { Header: 'Car Model', accessor: 'carModel' }
    ];




    const [data, setData] = useState([]);
const PullRequest= async()=>{
    try {
        const res=await fetch('/getBookingList',{
            method:"GET",
            headers:{ Accept: "application/json",
            "Content-Type": "application/json",},
            credentials: "include",
        })
        const data= await res.json();
       setData(data)
        // console.log(data);
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


    useEffect(() => {
        PullRequest();
    }, [])
    return (
        <>
            {/* <h5 className="fw-bold">Messages</h5> */}
            <div className="col-lg-10 col-md-10 mx-auto">
                <Table columns={columns} data={data} />
            </div>

        </>
    );
}

export default PullRequests;