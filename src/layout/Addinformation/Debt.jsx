import React, { useState, useEffect } from 'react'
import axios from 'axios';
import EditableDataGrid from '../../components/EditableTabel';
import Loading from "../../components/Loading";
import Swal from 'sweetalert2';
import { Box } from '@mui/material';


// const BASE_URL = process.env.REACT_APP_BASE_URL

const BASE_URL = "https://tracker.msolution.az"


const Debt = () => {
    const [row, setRow] = useState([])
    const [loading, setLoading] = useState(false);


    const getData = async () => {
        try {
            setLoading(true);
            let response = await axios(`${BASE_URL}/debt`);
            setRow(response.data.debts)
        } catch (error) {
            console.error("error", error);
            Swal.fire({
                icon: "error",
                title: `Oopsaaa...${error.name}`,
                text: `${error.message}`,
            });
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getData();
    }, []);


    const column = [
        {
            field: 'id',
            headerName: 'ID',
            width: 30,
            headerClassName: 'header',
            headerAlign: 'start',
            align: "center",
        },
        {
            field: 'totalAmount',
            headerName: 'MƏBLƏĞ',
            width: 200,
            editable: false,
            headerClassName: 'header',
            headerAlign: 'start',
            align: "center",

        },
        {
            field: 'debtSource',
            headerName: 'MƏNBƏ',
            width: 200,
            editable: false,
            headerClassName: 'header',
            headerAlign: 'start',
            align: "center",
        },
    ];

    return (
        <Box 
        > <h2 style={{ textAlign:"center" , marginBottom:"10px" ,  borderBottom:"2px  solid #42a5f5"}}>Borclar</h2>
            {
                loading ? <Loading /> : <EditableDataGrid rows={row} columns={column} />
            }
        </Box>
    )
}

export default Debt