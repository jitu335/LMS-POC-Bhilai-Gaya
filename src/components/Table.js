import React from 'react';
//import DataTable from 'react-data-table-component';

export default function Table() {
    const columns = [
        {
            name: 'SNo',
            selector: row => row.SNo,
            sortable: true,
        },
        {
            name: 'Program Name',
            selector: row => row.ProgramName,
            sortable: true,
        },
        {
            name: 'Create Date',
            selector: row => row.CreateDate,
            sortable: true,
        },
        {
            name: 'Program Category',
            selector: row => row.ProgramCategory,
            sortable: true,
        },
        {
            name: 'Program Owner',
            selector: row => row.ProgramOwner,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.Status,
            sortable: true,
        },
        {
            name: 'Start Date',
            selector: row => row.StartDate,
            sortable: true,
        },
        {
            name: 'End Date',
            selector: row => row.EndDate,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.Action,
            sortable: true,
        },
    ];

    const data = [
        {
            id: 1,
            SNo : '1',
            ProgramName: 'DSA 4 women 2.0',
            CreateDate : '22/02/2022',
            ProgramCategory : 'DSA 4',
            ProgramOwner : 'XYZ',
            Status:'Active',
            StartDate : '22/02/2022',
            EndDate:'22/03/2022',
            Action:''
        },
        {
            id: 2,
            SNo : '2',
            ProgramName: 'DSA 4 women 2.0',
            CreateDate : '22/02/2022',
            ProgramCategory : 'DSA 4',
            ProgramOwner : 'XYZ',
            Status:'Active',
            StartDate : '22/02/2022',
            EndDate:'22/03/2022',
            Action:''
        },
        
    ]
    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', selectedRows);
    };
    return (
        <></>
            // <DataTable
            //     columns={columns}
            //     data={data}
            //     selectableRows
            //     onSelectedRowsChange={handleChange}
            //     responsive={true}
            // />
        
    )
}
