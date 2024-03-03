// Popup.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import { Box, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2';

const BASE_URL = process.env.REACT_APP_BASE_URL;



const Popup = () => {
    const navigate = useNavigate()
    const { type } = useParams()
    const [source, setSource] = useState({
        type: type,
        name: ""
    })

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("")
    const [isFormVisible, setFormVisibility] = useState(true);


    const HandleChange = (e) => {
        const { name, value } = e.target
        setSource({ ...source, [name]: value })
    }


    const GetSource = async () => {

        try {
            const response = await axios.get(`${BASE_URL}/get-user-defined-sources?type=${type}`,
                { headers: { 'Authorization': `Bearer ${token}` } })
            setData(response.data.sources)
            if (!response.status === 200) {
                setLoading(true)
            } else {
                setLoading(false)
            }
            // console.log("response", response.status)
        } catch (error) {
            console.error("error", error);

            Swal.fire({
                icon: "error",
                title: `Oopsaaa...${error.name}`,
                text: `${error.message}`,
            });
        }
    }
    useEffect(() => {
        setToken(JSON.parse(sessionStorage.getItem("access_token")))
        GetSource()
    }, [])



    const PostSource = async () => {
        try {
            if (!source.type || !source.name) {
                Swal.fire({
                    icon: "error",
                    text: "zəhmət olmasa xanaları boş saxlamayın",
                    showConfirmButton: false,
                    timer: 1000
                });
            } else {
                const response = await axios.post(`${BASE_URL}/add-user-defined-source`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    }, source)
                setFormVisibility(true)
                setSource({
                    type: type,
                    name: ""
                })
                Swal.fire({
                    icon: "success",
                    title: "Məlumat uğurla əlavə edildi",
                    text: `${response.data.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                if (response) {
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error("error", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    const UpdateSource = async (id, sourceName) => {
        const newValue = prompt("Düzəliş et:", sourceName);
        try {
            if (newValue) {
                const response = await axios.put(`${BASE_URL}/update-user-defined-source`, {
                    type: type,
                    id: id,
                    newName: newValue,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                window.location.reload();
                Swal.fire({
                    icon: 'success',
                    text: 'Dəyişiklik əlavə edildi!',
                    showConfirmButton: false,
                    timer: 1000,
                  });
            }
            else {
                Swal.fire({
                    icon: "error",
                    text: "boş dəyər əlavə edilə bilməz",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        } catch (error) {
            console.error("error", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                showConfirmButton: false,
                timer: 2000
            });
        }
    }

    const FormVisible = () => {
        setFormVisibility(false)
    }

const buttonStyle = {
    textTransform: "none",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "orange",
    '&:hover': { color: "#333" }
}

    return (
        <Box sx={{ minHeight: "100vh", display: 'flex', justifyContent: "center", alignItems: "start", background: "#f4f4f4" }}>
            <Box sx={{ display: 'flex', flexDirection: "column", width: "600px", background: "#fff", padding: "10px", margin: "50px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Button sx={buttonStyle}
                        onClick={() => { navigate("/add-info") }}
                    >
                        <ArrowBackIcon /> Əvvəlki səhifəyə qayıt
                    </Button>
                    <Button sx={buttonStyle}
                        onClick={() => { navigate("/") }}
                    >
                        Əsas səhifəyə keçid et <AccountBalanceIcon />
                    </Button>
                </div>
                <h2 style={{ textAlign: "center" }}>Dəyərlər</h2>
                <ul style={{ display: 'flex', flexDirection: "column", }}>
                    {
                        loading ? <div style={{ margin: "0 auto" }}>
                            <Loading />
                        </div>
                            :
                            data.map((item) => (
                                <li key={item.id} style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", margin: "3px 15px", borderBottom: "1px solid black" }}>
                                    <span>{item.sourceName}</span>
                                    <Button
                                        sx={{
                                            backgroundcolor: "#fff", color: "gray",
                                            '&:hover': {
                                                color: "blue"
                                            }
                                        }}
                                        onClick={() => UpdateSource(item.id, item.sourceName)}>
                                        <EditIcon />
                                    </Button>
                                </li>
                            ))}
                </ul>
                <Button
                    sx={{
                        display: !isFormVisible ? 'none' : 'block', background: "#333", color: "#fff", marginY: "20px", marginX: "10px",
                        '&:hover': {
                            backgroundColor: "orange"
                        }
                    }}
                    onClick={FormVisible}
                >Təsnifat üzrə dəyər yaradın</Button>
                <form action="" style={{ display: isFormVisible ? 'none' : 'flex', flexDirection: "column", gap: "5px" }}>
                    <TextField
                        sx={{ marginTop: "20px", marginX: "10px" }}
                        type="text"
                        name='name'
                        label="məlumat daxil edin"
                        value={source.name}
                        onChange={HandleChange}
                    />
                    <Button
                        onClick={PostSource}
                        sx={{
                            background: 'orange', color: "white", background: "#333", marginY: "20px", marginX: "10px",
                            '&:hover': {
                                backgroundColor: "orange"
                            }
                        }}
                    >əlavə et</Button>
                </form>
            </Box>
        </Box>
    );
};

export default Popup;


