import React, { useMemo, useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
//MRT Imports
import MaterialReactTable from 'material-react-table';

//Material-UI Imports
import {
  Box,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material';
import { Edit, RemoveRedEye } from '@mui/icons-material';
import axios from 'axios';
import AppStatusPane from '../AppStatusPane';
import { AuthContext } from '../../AuthContext';


function Stage1Dash() {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [postResult, setPostResult] = useState(null);
  async function fetchDashData() {
    let msg = JSON.stringify({
      "dataSource": "Singapore-free-cluster",
      "database": "appWorkflow",
      "collection": "applications",
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-gqwih/endpoint/data/v1/action/find',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
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
            size: 50,
          },
          {
            accessorKey: 'name', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Name',
            size: 150,
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
            accessorKey: 'location', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Location',
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
            accessorKey: 'description', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Case Description',
            size: 100,
          },
          {
            accessorKey: 'operatorName', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Operator Name',
            size: 100,
          },
          {
            accessorKey: 'caseClassification', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Case Classification',
            size: 100,
          },
          {
            accessorKey: 'doi', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            header: 'Date of Incidence',
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
                className='box-style'
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() === 'Draft'
                      ? theme.palette.warning.light
                      : cell.getValue() === 'Open'
                        ? theme.palette.primary.light
                        : cell.getValue().includes('Temp CFF')
                          ? theme.palette.warning.dark
                          : cell.getValue().includes('Escalated')
                            ? theme.palette.success.light
                            : cell.getValue().includes('Re-Assign')
                              ? theme.palette.error.light
                              : cell.getValue().includes('Archive')
                                ? theme.palette.secondary.light
                                : theme.palette.error.dark,
                  borderRadius: '0.25rem',
                  display: 'inline-block',
                  color: '#fff',
                  minWidth: '12ch !important',
                  textAlign: 'center !important',
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

  const onNewCaseClick = () => {
    navigate(`/app/add/${postResult === null ? 1 : postResult.length + 1}`);
  };

  return (

    <div>
      <div><AppStatusPane parentData={postResult} stage='stage1'/></div>
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
          initialState={{ showColumnFilters: true, density: 'compact', columnVisibility: { Select: false, gender: false, idType: false, location: false, address: false, dob: false, role: false, description: false, caseClassification: false, operatorName: false, doi: false } }}
          positionToolbarAlertBanner='bottom'
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <ActionButton row={row.original} />
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <Button
              className='primary'
              variant='contained'
              onClick={() => onNewCaseClick()}
            >
              Create New Case
            </Button>
          )}
        />
      </div>
    </div>
  );
};

const ActionButton = (props) => {
  const navigate = useNavigate();
  const onEditClick = (row) => {
    navigate(`/app/edit/${props.row.caseId}`, { state: props.row });
  };

  const onViewClick = (row) => {
    navigate(`/view/stage1/${props.row.caseId}`, { state: props.row });
  };

  if (props.row.caseStatus === 'Draft') {
    return (<Tooltip arrow placement='left' title='Edit Case'>
      <IconButton onClick={() => onEditClick(props.row)}>
        <Edit />
      </IconButton>
    </Tooltip>
    );
  } else {
    return (<Tooltip arrow placement='left' title='View'>
      <IconButton onClick={() => onViewClick(props.row)}>
        <RemoveRedEye />
      </IconButton>
    </Tooltip>);
  }
}

export default Stage1Dash;