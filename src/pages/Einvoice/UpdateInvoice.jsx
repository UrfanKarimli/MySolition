import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

//? ----------- Material UI components --------------------

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

//? ---------------- Sweet Alert ------------------

import Swal from 'sweetalert2'

//? ------------------- CSS --------------------
import "../../CSS/pages/invoice/addInvoice.css";


const BASE_URL = process.env.REACT_APP_BASE_URL;


const UpdateInvoice = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [invoiceData, setInvoiceData] = useState(
    {
      id: Number(id),
      username:"",
      eInvoiceAmount:"",
      eInvoiceStatus: "Göndərilməyib",
      paymentStatus: "Ödənilməyib",
      serverFeeAmount:"",
      driverBankAccountFeeAmount:"",
      driverCardFeeAmount:"",
      fleetBankAccountFeeAmount:"",
      fleetCardFeeAmount:"",
      additionalFeeAmount:"",
      additionalFeeDescription: ""
    }
  );

  const invoiceStatus = [
    {
      label: "Göndərilib",
      value: "Göndərilib",
    },
    {
      label: "Göndərilməyib",
      value: "Göndərilməyib",
    },
  ];
  
  const paymentStatus = [
    {
      label: "Ödənilib",
      value: "Ödənilib",
    },
    {
      label: "Ödənilməyib",
      value: "Ödənilməyib",
    },
  ];


  const disableScroll = (e) => {
    e.target.blur();
  };

//! ----------------- Get Method --------------------------

  const getData = async () => {
    try {
      const response = await axios(`${BASE_URL}/e-invoice`);
      const selectedRow = response.data.data.find((user) => Number(user.id) === Number(id));
      const { username,date,eInvoiceAmount,eInvoiceStatus,paymentStatus, serverFeeAmount,driverBankAccountFeeAmount,driverCardFeeAmount,fleetBankAccountFeeAmount ,fleetCardFeeAmount,additionalFeeAmount,additionalFeeDescription} = selectedRow;
      if (selectedRow) {
        setInvoiceData({
            id: Number(id),
            username: username,
            date: date,
            eInvoiceAmount: eInvoiceAmount,
            eInvoiceStatus: eInvoiceStatus,
            paymentStatus: paymentStatus,
            serverFeeAmount: serverFeeAmount,
            driverBankAccountFeeAmount: driverBankAccountFeeAmount,
            driverCardFeeAmount: driverCardFeeAmount,
            fleetBankAccountFeeAmount: fleetBankAccountFeeAmount,
            fleetCardFeeAmount: fleetCardFeeAmount,
            additionalFeeAmount: additionalFeeAmount,
            additionalFeeDescription: additionalFeeDescription,
        });
    }
      // setInvoiceData(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

//! ----------------- Update Method --------------------------

  const updateData = async () => {

    const {
      username,
      eInvoiceAmount,
      serverFeeAmount,
      driverBankAccountFeeAmount,
      driverCardFeeAmount,
      fleetBankAccountFeeAmount,
      fleetCardFeeAmount,
      additionalFeeAmount,
    } = invoiceData;

    if(!username ||
      !eInvoiceAmount ||
      !serverFeeAmount ||
      !driverBankAccountFeeAmount ||
      !driverCardFeeAmount ||
      !fleetBankAccountFeeAmount ||
      !fleetCardFeeAmount ||
      !additionalFeeAmount){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Xanalar tam doldurulmayıb",
        });
      }else{
        const response = await axios.put(`${BASE_URL}/e-invoice/${id}`,invoiceData);
        console.log(response);
        navigate("/e-invoice");
      }
  }

  return (
    <div className="invoice">
      <h1 className="page_name">Park üçün E-qaiməni redaktə et </h1>
      <div className="bg">
        <div className="main">

          {/*---------------- İstifadəçi adı ---------------- */}

          <label className="labels">İstifadəçi adı</label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 ,input: { color: 'rgb(25,118,210)' } }}
            variant="filled"
            type="text"
            name="username"
            value = {invoiceData.username}
            onChange={onHandleChange}
          ></TextField>


          {/*------------ E-Qaimə-Faktura məbləği ---------------- */}

          <label className="labels">Elektron-Qaimə-Faktura məbləği </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 ,input: { color: 'rgb(25,118,210)' } }}
            variant="filled"
            type="number"
            name="eInvoiceAmount"
            value = {invoiceData.eInvoiceAmount}
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          {/*----------------- Qaimə statusu -------------------- */}

          <label className="labels">Qaimə statusu </label>
          <TextField
            sx={{ my: 3, mr: -3 ,value: { color: 'rgb(25,118,210)' } }}
            className="inp inp-value"
            id="filled-select-invoiceStatus"
            select
            label='select'
            value={invoiceData.eInvoiceStatus}
            onChange={onHandleChange}
            variant="filled"
            name="eInvoiceStatus"
          >
            {invoiceStatus.map((option) => (
            <MenuItem key={option.value} value={option.value} >
              {option.value}
            </MenuItem>
          ))}
          </TextField>

          {/*----------------- Ödəniş statusu -------------------- */}

          <label className="labels">Ödəniş statusu </label>
          <TextField
            sx={{ my: 3, mr: -3 ,input: { color: 'rgb(25,118,210)' } }}
            className="inp"
            id="filled-select-invoiceStatus"
            select
            label= 'select'
            value={invoiceData.paymentStatus}
            variant="filled"
            name="paymentStatus"
            onChange={onHandleChange}
          >
            {paymentStatus.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
          </TextField>

          {/*---------------- Server xidmət haqqı ---------------- */}

          <label className="labels">Server xidmət haqqı (AZN) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 ,input: { color: 'rgb(25,118,210)' } }}
            variant="filled"
            type="number"
            name="serverFeeAmount"
            value = {invoiceData.serverFeeAmount}
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          {/*------------ Sürücülər üzrə xidmət haqqı (AZN) --------------*/}

          <hr />
          <h3>Sürücülər üzrə xidmət haqqı (AZN)</h3>
          <label className="labels">Bank hesabı üzrə (VÖEN-li) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 ,input: { color: 'rgb(25,118,210)' } }}
            variant="filled"
            type="number"
            name="driverBankAccountFeeAmount"
            value={invoiceData.driverBankAccountFeeAmount}
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          <label className="labels">Avtomatik kart üzrə (VÖEN-siz) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 ,input: { color: 'rgb(25,118,210)' } }}
            variant="filled"
            type="number"
            name="driverCardFeeAmount"
            value={invoiceData.driverCardFeeAmount}
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          {/*------------ Fleetlər üzrə xidmət haqqı (AZN) --------------*/}

          <hr />
          <h3>Fleetlər üzrə xidmət haqqı (AZN)</h3>
          <label className="labels">Bank hesabı üzrə (VÖEN-li) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 ,input: { color: 'rgb(25,118,210)' } }}
            variant="filled"
            type="number"
            name="fleetBankAccountFeeAmount"
            value={invoiceData.fleetBankAccountFeeAmount}
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          <label className="labels">Avtomatik kart üzrə (VÖEN-siz) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 ,input: { color: 'rgb(25,118,210)' } }}
            variant="filled"
            type="number"
            name="fleetCardFeeAmount"
            value={invoiceData.fleetCardFeeAmount}
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          {/*------------ Əlavə xidmət haqqı --------------*/}

          <hr />
          <h3>Əlavə xidmət haqqı</h3>
          <label className="labels">Xidmət haqqı (AZN) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 ,input: { color: 'rgb(25,118,210)' } }}
            variant="filled"
            type="number"
            name="additionalFeeAmount"
            value={invoiceData.additionalFeeAmount}
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          <label className="labels">Təsviri </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 ,input: { color: 'rgb(25,118,210)' } }}
            variant="filled"
            type="text"
            name="additionalFeeDescription"
            value= {invoiceData.additionalFeeDescription}
            onChange={onHandleChange}
          ></TextField>
        </div>
      </div>

      {/* ---------------- Əlavə et ----------------------*/}

    <button className="btn" onClick={updateData}>
      Redaktə et
    </button>
    </div>
  );
};

export default UpdateInvoice;
