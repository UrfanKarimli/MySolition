import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Debt from "../../layout/Addinformation/Debt";
import SideNav from "../../components/structure/SideNav";
import Navbar from "../../components/structure/NavBar";
import Total from "../../layout/Addinformation/Total";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';





const Dashboard = () => {
    const navigate = useNavigate();


    const buttonStyle = {
        backgroundColor: "#FFA500",
        padding: "2px",
        maxWidth: "200px",
        fontSize: "12px",
        textTransform: "lowercase",
        '&:hover': {
            backgroundColor: '#FFBF00',
        },
    };

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex" }}>
                <SideNav />
                <Box component="main" sx={{ margin: "80px auto 0" }}>
                    <Box >
                        <h1 style={{ textAlign: "center", }}>Maliyyə hesabatları</h1>
                        <Total />
                        <Stack sx={{ display: "flex", flexDirection: "column", gap: "15px", marginY: "15px" }}>
                            <Button
                                sx={buttonStyle}
                                onClick={() => {
                                    navigate("/transactions");
                                }}
                                variant="contained"
                            >

                                Əməliyyatlara bax
                            </Button>
                            <Button sx={buttonStyle}
                                onClick={() => {
                                    navigate("/add-info");
                                }}
                                variant="contained"
                            >
                                Məlumat daxil et +
                            </Button>
                        </Stack>

                        <Box sx={{ width: "100%" }}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Debt />
                            </Box>
                        </Box>
                    </Box>

                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
