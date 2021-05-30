import { usePagination, useTable } from "react-table";

import { getTeams } from "../../fakeData";


const Table = ({ columns, data }) => {
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
                                    if (cell.column.id === 'image')
                                        return <td {...cell.getCellProps()}>
                                            <img src={cell.value} alt="" className="img-fluid" style={{ width: 120 }} />
                                        </td>
                                    else
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                })}

                                <td><button className="btn btn-sm float-end me-5 btn-rounded btn-danger">Delete</button></td>
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
        { Header: 'Name', accessor: 'name' },
        { Header: 'Description', accessor: 'description' },
        { Header: 'Image', accessor: 'image' }
    ];
    const data = getTeams();
    return (
        <>
            <div className="col-lg-10 col-md-10 mx-auto">
                <Table columns={columns} data={data} />
            </div>

        </>
    );
}

export default ViewTeam;
