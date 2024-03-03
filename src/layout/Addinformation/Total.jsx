import React, { useState, useEffect } from 'react'
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import Loading from "../../components/Loading";
import Swal from 'sweetalert2';


const BASE_URL = "https://tracker.msolution.az"



// const BASE_URL = process.env.REACT_APP_BASE_URL


const Total = () => {
  const [net, setNet] = useState([])
  const [totalDebt, setTotalDebt] = useState([])
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("")


  const getData = async () => {
    try {
      setLoading(true);
      let response = await axios(`${BASE_URL}/net`
        , {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      let resdebt = await axios(`${BASE_URL}/totalDebt`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setNet(response.data.netIncome)
      setTotalDebt(resdebt.data.totalDebt)
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
    setToken(JSON.parse(sessionStorage.getItem("access_token")))
  }, [net, totalDebt]);




  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: 350,
            height: 60,
            borderRadius: 5,
            padding: 1,
            color: "white",
            backgroundColor: "#414141",
          },
          marginTop: 2,
          marginBottom: 2,
        }}
        gap={5}
      >
        <Paper elevation={5} > {loading ? <Loading /> :
          <h3 style={{ margin: 10 }}>Mənfəət: <span style={{ color: "#008000", fontSize: 16, fontWeight: 700, marginLeft: 10 }} >{net} ₼</span> </h3>
        }

        </Paper>
        <Paper elevation={5}>{
          loading ? <Loading /> :
            <h3 style={{ margin: 10 }}>Borc:  <span style={{ color: "#ce4242", fontSize: 16, fontWeight: 700, marginLeft: 10 }}>{totalDebt} ₼</span></h3>
        }
        </Paper>
      </Box>
    </>
  );
};

export default Total;
