import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//? ----------- Material UI components --------------------

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

//? ---------------- Sweet Alert ------------------

import Swal from 'sweetalert2'

//? ------------------- CSS --------------------
import "../../CSS/pages/invoice/addInvoice.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddInvoice = () => {
  const navigate = useNavigate();
  const currentDate = new Date();

  const [invoiceData, setInvoiceData] = useState({
    id: Date.now(),
    username: "",
    date: currentDate.toISOString().slice(0, 10),
    eInvoiceAmount: "",
    eInvoiceStatus: "Göndərilməyib",
    paymentStatus: "Ödənilməyib",
    serverFeeAmount: "",
    driverBankAccountFeeAmount: "",
    driverCardFeeAmount: "",
    fleetBankAccountFeeAmount: "",
    fleetCardFeeAmount: "",
    additionalFeeAmount: "",
    additionalFeeDescription: "",
  });

  const sendData = async () => {
    try {
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
  
      if (
        !username ||
        !eInvoiceAmount ||
        !serverFeeAmount ||
        !driverBankAccountFeeAmount ||
        !driverCardFeeAmount ||
        !fleetBankAccountFeeAmount ||
        !fleetCardFeeAmount ||
        !additionalFeeAmount
      ) {
        throw new Error("Xanalar tam doldurulmayıb");
      }
  
      await axios.post(`${BASE_URL}/e-invoice/create`, invoiceData);
      navigate("/e-invoice");
      // console.log(invoiceData);
    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: error.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  
  const disableScroll = (e) => {
    e.target.blur();
  };

  const onHandleChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

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

  return (
    <div className="invoice">
      <h1 className="page_name">Park üçün E-qaimə əlavə et </h1>
      <div className="bg">
        <div className="main">

          {/*---------------- İstifadəçi adı ---------------- */}

          <label className="labels">İstifadəçi adı</label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 }}
            variant="filled"
            label="UserName"
            type="text"
            name="username"
            onChange={onHandleChange}
          ></TextField>

          {/*------------ E-Qaimə-Faktura məbləği ---------------- */}

          <label className="labels"> E-qaimə faktura məbləği </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 }}
            variant="filled"
            label="E-Invoice Amount"
            type="number"
            name="eInvoiceAmount"
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          {/*----------------- Qaimə statusu -------------------- */}

          <label className="labels">Qaimə statusu </label>
          <TextField
            sx={{ my: 3, mr: -3 }}
            className="inp"
            id="filled-select-invoiceStatus"
            select
            label="Select"
            defaultValue="Göndərilməyib"
            variant="filled"
            name="eInvoiceStatus"
            onChange={onHandleChange}
          >
            {invoiceStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>


          {/*----------------- Ödəniş statusu -------------------- */}

          <label className="labels">Ödəniş statusu </label>
          <TextField
            sx={{ my: 3, mr: -3 }}
            className="inp"
            id="filled-select-invoiceStatus"
            select
            label="Select"
            defaultValue="Ödənilməyib"
            variant="filled"
            name="paymentStatus"
            onChange={onHandleChange}
          >
            {paymentStatus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/*---------------- Server xidmət haqqı ---------------- */}

          <label className="labels">Server xidmət haqqı (AZN) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 }}
            variant="filled"
            label="Server Fee Amount"
            type="number"
            name="serverFeeAmount"
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          {/*------------ Sürücülər üzrə xidmət haqqı (AZN) --------------*/}

          <hr />
          <h3>Sürücülər üzrə xidmət haqqı (AZN)</h3>
          <label className="labels">Bank hesabı üzrə (VÖEN-li) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 }}
            variant="filled"
            label="Driver Bank Account Fee Amount"
            type="number"
            name="driverBankAccountFeeAmount"
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          <label className="labels">Avtomatik kart üzrə (VÖEN-siz) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 }}
            variant="filled"
            label="Driver Card Fee Amount"
            type="number"
            name="driverCardFeeAmount"
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          {/*------------ Fleetlər üzrə xidmət haqqı (AZN) --------------*/}

          <hr />
          <h3>Fleetlər üzrə xidmət haqqı (AZN)</h3>
          <label className="labels">Bank hesabı üzrə (VÖEN-li) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 }}
            variant="filled"
            label="Fleet Bank Account Fee Amount"
            type="number"
            name="fleetBankAccountFeeAmount"
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          <label className="labels">Avtomatik kart üzrə (VÖEN-siz) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 }}
            variant="filled"
            label="Fleet Card Fee Amount"
            type="number"
            name="fleetCardFeeAmount"
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          {/*------------ Əlavə xidmət haqqı --------------*/}

          <hr />
          <h3>Əlavə xidmət haqqı</h3>
          <label className="labels">Xidmət haqqı (AZN) </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 }}
            variant="filled"
            label="Additional Fee Amount"
            type="number"
            name="additionalFeeAmount"
            onChange={onHandleChange}
            onWheel={disableScroll}
          ></TextField>

          <label className="labels">Təsviri </label>
          <TextField
            className="inp"
            sx={{ my: 3, mr: -3 }}
            variant="filled"
            label="Additional Fee Description"
            type="text"
            name="additionalFeeDescription"
            onChange={onHandleChange}
          ></TextField>
        </div>
      </div>

      {/* ---------------- Əlavə et ----------------------*/}

      <button className="btn" onClick={sendData}>
        Əlavə et
      </button>
    </div>
  );
};

export default AddInvoice;
