import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
//MRT Imports
import MaterialReactTable from 'material-react-table';

//Material-UI Imports
import {
    Box,
    Tooltip,
    IconButton,
} from '@mui/material';
import { RemoveRedEye } from '@mui/icons-material';
import axios from 'axios';
import AppStatusPane from '../AppStatusPane';

const OICDash = () => {
    const navigate = useNavigate();
    const [postResult, setPostResult] = useState([]);
    const fetchDashData = () => {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "appWorkflow",
            "collection": "applications",
            "filter": { "appStatus": { "$in": ["Submitted"] } },
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/find',
            headers: {
                'api-key': 'ox92OF8v8L0rEaIvT10XLtBR3miiJVEvS0gvvivhcXKtbyPggS4GZ6crLQlYL30n',
                'Content-Type': 'application/json',
            },
            data: msg
        };

        axios.request(config)
            .then((response) => {
                setPostResult(response.data.documents);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchDashData();
    }, []);

    const columns = useMemo(
        () => [
            {
                id: 'application', //id used to define `group` column
                header: '',
                columns: [
                    {
                        accessorKey: 'applicationId',
                        id: 'applicationId', //id is still required when using accessorFn instead of accessorKey
                        header: 'App ID',
                        size: 100,
                    },
                    {
                        accessorKey: 'fiName', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'FI Name',
                        size: 200,
                    },
                    {
                        accessorKey: 'uid', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'UID',
                        size: 100,
                    },
                    {
                        accessorKey: 'idType', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'ID Type',
                        size: 50,
                    },
                    {
                        accessorKey: 'uenNumber', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'UEN No.',
                        size: 50,
                    },
                    {
                        accessorKey: 'countryOfOrigin', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'Country of Origin',
                        size: 50,
                    },
                    {
                        accessorKey: 'address', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'address',
                        size: 300,
                    },
                    {
                        accessorKey: 'gender', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'Gender',
                        size: 50,
                    },
                    {
                        accessorKey: 'dob', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'Date of Birth',
                        size: 100,
                    },
                    {
                        accessorKey: 'role', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'Role',
                        size: 100,
                    },
                    {
                        accessorKey: 'appType', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'App Type',
                        size: 100,
                    },
                    {
                        accessorKey: 'asignee', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'Asignee',
                        size: 100,
                    },
                    {
                        accessorKey: 'appStatus', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        enableClickToCopy: true,
                        header: 'Status',
                        size: 100,
                    }
                ],
            }
        ],
        [],
    );

    const onViewClick = (row) => {
        navigate(`/view/${row.original.applicationId}`, { state: row.original });
      };


    return (
        <div>
            <div><AppStatusPane /></div>
            <div className='mui-table'>
                <MaterialReactTable
                    displayColumnDefOptions={{
                        'mrt-row-actions': {
                            muiTableHeadCellProps: {
                                align: 'center',
                            },
                            size: 120,
                        },
                    }}
                    enableRowActions
                    columns={columns}
                    data={postResult}
                    enableColumnFilterModes
                    enableColumnOrdering
                    enableGrouping
                    enablePinning
                    enableRowSelection={false}
                    enableSelectAll={false}
                    initialState={{ showColumnFilters: true, density: 'compact', columnVisibility: { Select: false, applicationId: false, gender: false, idType: false, countryOfOrigin: false, address: false, dob: false, role: false } }}
                    positionToolbarAlertBanner='bottom'
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Tooltip arrow placement='left' title='View'>
                                <IconButton>
                                    <RemoveRedEye onClick={() => onViewClick(row)}/>
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                />
            </div>
        </div>

    );
};

export default OICDash;