import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";



const CustomNoRowsOverlay = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <p>Məlumat yoxdur</p>
        </div>
    );
};


const EditableDataGrid = ({ columns, rows, url, processRowUpdate }) => {
    const navigate = useNavigate();
    const idValues = rows.map(item => item.id);
    return (
        <div>
            <Box sx={{
                height: 600,
                width: '100%',

            }}>

                <DataGrid
                    rows={typeof rows === "undefined" ? [] : rows}
                    columns={typeof columns === "undefined" ? [] : columns}

                    idField={idValues}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    slots={{
                        noRowsOverlay: CustomNoRowsOverlay,
                    }}
                    onCellClick={(params) => {
                        if (typeof url !== "undefined") {
                            navigate(`${url}/${params.id}`)
                        }
                    }}

                    sx={{
                        boxShadow: 2,
                        border: 2,
                        borderColor: 'primary.light',
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                    editMode="cell"
                    // pageSizeOptions={[10]}
                    // // pageSize={10}
                    // rowsPerPageOptions={[5, 10, 20]}

                    pageSize={5}
                    pageSizeOptions={[5, 10, 20]}
                    pagination
                    disableRowSelectionOnClick
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={(error) => {
                        console.error('Row update error:', error);
                    }}
                />
            </Box>
        </div>
    )
}

export default EditableDataGrid