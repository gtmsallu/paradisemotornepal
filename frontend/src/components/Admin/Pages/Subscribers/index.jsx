import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { usePagination, useTable } from "react-table";

import { getSubs } from "./../../fakeData";

const Table = ({ columns, data }) => {
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
        // state: { pageIndex, pageSize }
        state: { pageIndex }
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 },
    },
        usePagination);

    return (
        <>
            <table class="table table-hover" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                            <th scope="col" style={{ width: '10%' }}></th>
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
                                <td><button className="btn btn-sm float-end me-5 btn-rounded btn-danger">Delete</button></td>
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

const Subscribers = () => {
    const columns = [
        {
            Header: 'Name', accessor: 'name',
        },
        {
            Header: 'Email', accessor: 'subscribeMail',
        }
    ];


    const [data, setData] = useState([]);

    const getSubscribers= async()=>{
        try {
            const res=await fetch('/getSubscriber',{
                method:"GET",
                headers:{ Accept: "application/json",
                "Content-Type": "application/json",},
                credentials: "include",
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
    
    
        useEffect(() => {
            getSubscribers();
        }, [])
    return (
        <>
            <div className="col-lg-8 col-md-10 mx-auto">
                <Table columns={columns} data={data} />
            </div>

        </>
    );
}

export default Subscribers;