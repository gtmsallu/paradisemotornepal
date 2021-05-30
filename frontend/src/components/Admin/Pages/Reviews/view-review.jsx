import { Pagination } from "react-bootstrap";
import { usePagination, useTable } from "react-table";

import { getReviews } from "../../fakeData";


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
                                
                                <td><button className="btn float-end me-5 btn-rounded btn-danger">Delete</button></td>
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

const ViewReview = () => {
    const columns = [
        { Header: 'Customer Name', accessor: 'name' },
        { Header: 'Review', accessor: 'review' },
        { Header: 'Image', accessor: 'image' }
    ];
    const data = getReviews();
    return (
        <>
            <div className="col-lg-10 col-md-10 mx-auto">
                <Table columns={columns} data={data} />
            </div>

        </>
    );
}

export default ViewReview;