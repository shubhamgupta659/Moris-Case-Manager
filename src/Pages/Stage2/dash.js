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

const Stage2Dash = () => {
    const navigate = useNavigate();
    const [postResult, setPostResult] = useState(null);
    async function fetchDashData() {
        let msg = JSON.stringify({
            "dataSource": "Singapore-free-cluster",
            "database": "appWorkflow",
            "collection": "applications",
            "filter": { "caseStatus": { "$in": ["Submitted", "S2 Clarified", "S2 Verified", "S2 Approved"] } },
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

        await axios.request(config)
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
                id: 'case', //id used to define `group` column
                header: '',
                columns: [
                    {
                        accessorKey: 'caseId',
                        id: 'caseId', //id is still required when using accessorFn instead of accessorKey
                        header: 'Case Id',
                        size: 100,
                    },
                    {
                        accessorKey: 'fiName', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'FI Name',
                        size: 200,
                    },
                    {
                        accessorKey: 'uid', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'UID',
                        size: 100,
                    },
                    {
                        accessorKey: 'idType', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'ID Type',
                        size: 50,
                    },
                    {
                        accessorKey: 'uenNumber', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'UEN No.',
                        size: 50,
                    },
                    {
                        accessorKey: 'countryOfOrigin', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'Country of Origin',
                        size: 50,
                    },
                    {
                        accessorKey: 'address', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically

                        header: 'address',
                        size: 300,
                    },
                    {
                        accessorKey: 'gender', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically

                        header: 'Gender',
                        size: 50,
                    },
                    {
                        accessorKey: 'dob', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'Date of Birth',
                        size: 100,
                    },
                    {
                        accessorKey: 'role', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'Role',
                        size: 100,
                    },
                    {
                        accessorKey: 'caseType', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'Case Type',
                        size: 100,
                    },
                    {
                        accessorKey: 'assignee', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'Asignee',
                        size: 100,
                    },
                    {
                        accessorKey: 'caseStatus', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                        header: 'Case Status',
                        size: 100,
                        Cell: ({ cell }) => (
                            <Box
                                component="span"
                                sx={(theme) => ({
                                    backgroundColor:
                                        cell.getValue() === 'S1 Draft'
                                            ? theme.palette.warning.light
                                            : cell.getValue() === 'S1 Submitted'
                                                ? theme.palette.primary.light
                                                : cell.getValue().includes('Rejected')
                                                    ? theme.palette.error.dark
                                                    : cell.getValue().includes('Approved')
                                                        ? theme.palette.success.light
                                                        : cell.getValue().includes('Clarification')
                                                            ? theme.palette.error.light
                                                            : cell.getValue().includes('Clarified')
                                                                ? theme.palette.secondary.light
                                                                : theme.palette.warning.dark,
                                    borderRadius: '0.25rem',
                                    color: '#fff',
                                    minWidth: '12ch',
                                    textAlign: 'center',
                                    p: '0.5rem',
                                })}
                            >
                                {cell.getValue()}
                            </Box>
                        ),
                    }
                ],
            }
        ],
        [],
    );

    const onViewClick = (row) => {
        navigate(`/view/stage2/${row.original.caseId}`, { state: row.original });
    };


    return (
        <div>
            <div><AppStatusPane parentData={postResult} /></div>
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
                    data={postResult === null ? [] : postResult}
                    enableColumnFilterModes
                    enableColumnOrdering
                    enableGrouping
                    enablePinning
                    enableRowSelection={false}
                    enableSelectAll={false}
                    initialState={{ showColumnFilters: true, density: 'compact', columnVisibility: { Select: false, caseId: false, gender: false, idType: false, countryOfOrigin: false, address: false, dob: false, role: false } }}
                    positionToolbarAlertBanner='bottom'
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <Tooltip arrow placement='left' title='View'>
                                <IconButton onClick={() => onViewClick(row)}>
                                    <RemoveRedEye />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                />
            </div>
        </div>

    );
};

export default Stage2Dash;