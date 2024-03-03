import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideNav from "../../components/structure/SideNav";
import Navbar from "../../components/structure/NavBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const NewTaxiPark = () => {
  const navigate = useNavigate();

  const [taxiPark, setTaxiPark] = useState({
    id: Math.random().toString(16).slice(2),
    taxiParkName: "",
    legalName: "",
    taxNumber: "",
    serverFee: "",
    driverBankAccountFeePercentage: "",
    driverCardFeePercentage: "",
    fleetBankAccountFeePercentage: "",
    fleetCardFeePercentage: "",
    additionalFee: "",
    additionalFeeDescription: "",
  });

  const postData = async () => {
    try {
      if (
        !taxiPark.taxiParkName ||
        !taxiPark.legalName ||
        !taxiPark.taxNumber ||
        !taxiPark.serverFee ||
        !taxiPark.driverBankAccountFeePercentage ||
        !taxiPark.driverCardFeePercentage ||
        !taxiPark.fleetBankAccountFeePercentage ||
        !taxiPark.fleetCardFeePercentage ||
        !taxiPark.additionalFee ||
        !taxiPark.additionalFeeDescription
      ) {
        throw new Error("Zəhmət olmasa məlumatları tam daxil edin.");
      }else{
        const response = await axios.post(`${BASE_URL}/taxiPark`, taxiPark);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Məlumat uğurla əlavə edildi",
          showConfirmButton: false,
          timer: 1500,
        });
  
        navigate("/taxiPark");
      }

    } catch (error) {
      console.error(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops...",
        text: error.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleTaxiParkChange = (e) => {
    const { name, value } = e.target;
    setTaxiPark({ ...taxiPark, [name]: value });
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Taxi Park əlavə et</h1>
          <Box>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <h1
                  style={{
                    fontSize: 18,
                    borderBottom: "1px solid gray",
                    paddingBottom: 5,
                    marginBottom: 3,
                  }}
                >
                  Taxi Park Məlumatları
                </h1>
                <div>
                  <label htmlFor="">Taxi Park Adı: </label>
                  <TextField
                    type="text"
                    name="taxiParkName"
                    onChange={handleTaxiParkChange}
                    placeholder="Taxi Park adı yaz..."
                  />
                </div>
                <div>
                  <label htmlFor="">Hüquqi adı: </label>
                  <TextField
                    type="text"
                    name="legalName"
                    onChange={handleTaxiParkChange}
                    placeholder="Hüquqi adı yaz..."
                  />
                </div>
                <div>
                  <label htmlFor="">VÖEN: </label>
                  <TextField
                    type="text"
                    name="taxNumber"
                    onChange={handleTaxiParkChange}
                    placeholder="VÖEN yaz..."
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <h1
                  style={{
                    fontSize: 18,
                    borderBottom: "1px solid gray",
                    paddingBottom: 5,
                    marginBottom: 3,
                  }}
                >
                  Sürücü üzrə xidmət haqqı dərəcəsi
                </h1>
                <div>
                  <label htmlFor="">Bank hesabı üzrə (VÖEN-li): </label>
                  <TextField
                    type="text"
                    name="driverBankAccountFeePercentage"
                    onChange={handleTaxiParkChange}
                    placeholder="0.5%, min 0.25 AZN"
                  />
                </div>
                <div>
                  <label htmlFor="">Avtomatik kart üzrə (VÖEN-siz): </label>
                  <TextField
                    type="text"
                    name="driverCardFeePercentage"
                    onChange={handleTaxiParkChange}
                    placeholder="1.9%, min 0.5 AZN"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                <h1
                  style={{
                    fontSize: 18,
                    borderBottom: "1px solid gray",
                    paddingBottom: 5,
                    marginBottom: 3,
                  }}
                >
                  Fleet üzrə xidmət haqqı dərəcəsi
                </h1>
                <div>
                  <label htmlFor="">Bank hesabı üzrə (VÖEN-li): </label>
                  <TextField
                    type="text"
                    name="fleetBankAccountFeePercentage"
                    onChange={handleTaxiParkChange}
                    placeholder="0.25%"
                  />
                </div>
                <div>
                  <label htmlFor="">Avtomatik kart üzrə (VÖEN-siz): </label>
                  <TextField
                    type="text"
                    name="fleetCardFeePercentage"
                    onChange={handleTaxiParkChange}
                    placeholder="2%"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <h1
                  style={{
                    fontSize: 18,
                    borderBottom: "1px solid gray",
                    paddingBottom: 5,
                    marginBottom: 3,
                  }}
                >
                  Server Xidmət haqqı (AZN)
                </h1>
                <div>
                  <TextField
                    type="number"
                    name="serverFee"
                    onChange={handleTaxiParkChange}
                    placeholder="70"
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <h1
                  style={{
                    fontSize: 18,
                    borderBottom: "1px solid gray",
                    paddingBottom: 5,
                    marginBottom: 3,
                  }}
                >
                  Əlavə xidmət haqqı (AZN)
                </h1>
                <div>
                  <label htmlFor="">Fee: </label>
                  <TextField
                    type="number"
                    name="additionalFee"
                    onChange={handleTaxiParkChange}
                    placeholder="500"
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="">Təsvir: </label>
                  <TextField
                    multiline
                    style={{ height: 60 }}
                    name="additionalFeeDescription"
                    onChange={handleTaxiParkChange}
                    type="text"
                    placeholder="Təsvir ver..."
                  />
                </div>
              </div>
            </div>
          </Box>
          <Button className="buttonTaxi" variant="contained" onClick={postData}>
            Taxi Park əlavə et
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NewTaxiPark;
