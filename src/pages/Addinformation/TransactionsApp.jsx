import React, { useState, createContext, useContext } from 'react';
import SideNav from "../../components/structure/SideNav";
import Navbar from "../../components/structure/NavBar";
import EditableDataGrid from '../../components/EditableTabel';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

const BASE_URL = process.env.REACT_APP_BASE_URL;



const TransactionsApp = () => {

    const navigate = useNavigate()
    const [transactions, setTransactions] = useState([]);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [type, setType] = useState('');

    const fetchTransactionsData = async () => {
        let url = `${BASE_URL}/transactions`;

        const params = new URLSearchParams();

        if (fromDate) params.append('fromDate', fromDate);
        if (toDate) params.append('toDate', toDate);
        if (type) params.append('type', type);

        if (params.toString()) {
            url += `?${params.toString()}`;
        }
        try {
            const response = await axios.get(url);
            // console.log("response", response.data.transactions);
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error("error", error);
            Swal.fire({
                icon: "error",
                title: `Oopsaaa...${error.name}`,
                text: `${error.message}`,
            });
        }
    };


    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50,
            align: "center"
        },
        {
            field: 'description',
            headerName: 'Təsvir',
            width: 100,
            align: "center"
        },
        {
            field: 'amount',
            headerName: 'Məbləğ',
            width: 100,
            align: "center"
        },
        {
            field: 'date',
            headerName: 'Tarix',
            width: 150,
            align: "center"
        },
        {
            field: 'transaction_type',
            headerName: 'Növ',
            width: 150,
            align: "center"
        },
        {
            field: 'source_or_destination',
            headerName: 'Mənbə',
            width: 100,
            align: "center"
        },
        {
            field: 'username',
            headerName: 'Istifadəçi',
            width: 150,
            align: "center"
        },

        {
            field: 'delete',
            headerName: 'sil',
            sortable: false,
            width: 90,
            align: "center",
            renderCell: (params) => (
                <Button
                    sx={{
                        backgroundColor: 'white', color: 'gray', width: "50px", margin: "5px",
                        '&:hover': {
                            backgroundColor: 'white', color: 'red'
                        }
                    }}
                    variant="contained"
                    onClick={() => handleDelete(params)}
                >
                    <DeleteIcon />
                    sil
                </Button>
            ),
        },
        {
            field: 'update',
            headerName: 'düzəliş et',
            sortable: false,
            width: 90,
            align: "center",
            renderCell: (params) => (
                <Button
                    sx={{
                        backgroundColor: 'white', color: 'gray',
                        '&:hover': {
                            backgroundColor: 'white', color: 'blue'
                        }
                    }}
                    variant="contained"
                    onClick={() => handleUpdate(params)}
                >
                    <EditIcon />

                </Button>
            ),
        },
    ];


    function handleDelete(params) {
        // console.log("===========", params.row.id)
        let tip = params.row.transaction_type;
        let id = params.row.id;
        Swal.fire({
            title: "Əminsiniz?",
            text: "Əgər bu məlumatı silsəniz, bir daha geri qaytara bilməyəcəksiniz!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Bəli, sil!",
            cancelButtonText: "xeyir, geri qayıt"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${BASE_URL}/${tip}/${id}`).then(resp => {
                    Swal.fire({
                        title: "Silindi!",
                        text: "Məlumat uğurla silindi.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    window.location.reload();
                }).catch(error => {
                    Swal.fire({
                        title: "Error!",
                        text: `${error.message}`,
                        icon: "error"
                    });
                });
            }
        });
    };

    const handleUpdate = (params) => {
        let tip = params.row.transaction_type;
        let id = params.row.id;

        sessionStorage.setItem("selectrow", JSON.stringify(params.row))
        // setrow(params.row)
        navigate(`/update-data/${tip}/${id}`)
    }


    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex" }}>
                <SideNav />
                <Box
                    sx={{
                        margin: "90px auto 0",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                >
                    <h2 style={{ textAlign: "center", }}>Əməliyyatlar</h2>
                    <Box component="form" id="search-form" sx={{ marginTop: 2 }}>
                        <TextField
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Tarixdən"
                            inputProps={{ maxLength: 10 }}
                            InputLabelProps={{ shrink: true, style: { textAlign: 'center' } }}
                        />
                        <TextField
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Tarixə"
                            inputProps={{ maxLength: 10 }}
                            InputLabelProps={{ shrink: true, style: { textAlign: 'center' } }}
                        />
                        <FormControl variant="outlined" fullWidth margin="normal">
                            <InputLabel id="type-label">Növ</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                label="Növ"
                            >
                                <MenuItem value="">
                                    <em>Hamsı</em>
                                </MenuItem>
                                <MenuItem value="income">Gəlir</MenuItem>
                                <MenuItem value="expense">Xərc</MenuItem>
                                <MenuItem value="debt">Borc</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            sx={{
                                backgroundColor: "#FFA500", padding: "2px",
                                '&:hover': {
                                    backgroundColor: '#FFBF00',
                                },
                            }}
                            type="button"
                            onClick={fetchTransactionsData}
                            variant="contained"
                            fullWidth
                        >
                            Axtarış
                        </Button>
                    </Box>
                    <div style={{ width: '100%', marginTop: "20px" }}>
                        <div style={{ textAlign: "center", marginBottom: "10px", borderBottom: "2px  solid #42a5f5" }}>
                            {type === "" && (
                                <h2> Bütün əməliyyatlar </h2>
                            )}
                            {type === "income" && (
                                <h2> Gəlirlər </h2>
                            )} {type === "expense" && (
                                <h2> Xərclər </h2>
                            )}
                            {type === "debt" && (
                                <h2> Borclar </h2>
                            )}
                        </div>
                        <EditableDataGrid rows={transactions} columns={columns} />
                    </div>
                </Box>
            </Box>
       
        </>
    );
};

export default TransactionsApp;
