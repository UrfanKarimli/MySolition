import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useMatch } from "react-router-dom";
import SideNav from "../../components/structure/SideNav";
import Navbar from "../../components/structure/NavBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UpdateTaxiPark = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    additionalFee: "",
    additionalFeeDescription: "",
    driverBankAccountFeePercentage: "",
    driverCardFeePercentage: "",
    fleetBankAccountFeePercentage: "",
    fleetCardFeePercentage: "",
    id: "",
    legalName: "",
    serverFee: "",
    taxNumber: "",
    taxiParkName: "",
  });

  const match = useMatch("/updateTaxiPark/:id");
  const taxiParkId = match?.params.id ?? -1;

  useEffect(() => {
    if (taxiParkId !== -1) {
      getTaxiParkById(taxiParkId);
    }
  }, [taxiParkId]);

  const getTaxiParkById = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/taxiPark`);
      const result = await response.data.data;
      const taxiData = result.filter((item) => item.id === id);
      if (taxiData) {
        setData(taxiData[0]);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleTaxiParkChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(taxiParkId);
      await axios.put(`${BASE_URL}/taxiPark/${taxiParkId}`, data);
      Swal.fire({
        icon: "success",
        title: "Məlumat uğurla yeniləndi",
        timer: 1000,
      });
      navigate("/taxiPark");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Xəta",
      });
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Taxi Park Update</h1>
          <Box>
            <form onSubmit={handleSubmit}>
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
                    placeholder="Taxi Park adı yaz..."
                    onChange={handleTaxiParkChange}
                    value={data.taxiParkName}
                  />
                </div>
                <div>
                  <label htmlFor="">Hüquqi adı:</label>
                  <TextField
                    type="text"
                    name="legalName"
                    placeholder="Hüquqi adı yaz..."
                    onChange={handleTaxiParkChange}
                    value={data.legalName}
                  />
                </div>
                <div>
                  <label htmlFor="">VÖEN: </label>
                  <TextField
                    type="text"
                    name="taxNumber"
                    placeholder="VÖEN yaz..."
                    onChange={handleTaxiParkChange}
                    value={data.taxNumber}
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
                    placeholder="0.5%, min 0.25 AZN"
                    onChange={handleTaxiParkChange}
                    value={data.driverBankAccountFeePercentage}
                  />
                </div>
                <div>
                  <label htmlFor="">Avtomatik kart üzrə (VÖEN-siz): </label>
                  <TextField
                    type="text"
                    name="driverCardFeePercentage"
                    placeholder="1.9%, min 0.5 AZN"
                    onChange={handleTaxiParkChange}
                    value={data.driverCardFeePercentage}
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
                    placeholder="0.25%"
                    onChange={handleTaxiParkChange}
                    value={data.fleetBankAccountFeePercentage}
                  />
                </div>
                <div>
                  <label htmlFor="">Avtomatik kart üzrə (VÖEN-siz): </label>
                  <TextField
                    type="text"
                    name="fleetCardFeePercentage"
                    placeholder="2%"
                    onChange={handleTaxiParkChange}
                    value={data.fleetCardFeePercentage}
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
                    placeholder="70"
                    onChange={handleTaxiParkChange}
                    value={data.serverFee}
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
                    placeholder="500"
                    onChange={handleTaxiParkChange}
                    value={data.additionalFee}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="">Təsvir: </label>
                  <TextField
                    multiline
                    style={{ height: 60 }}
                    name="additionalFeeDescription"
                    type="text"
                    placeholder="Təsvir ver..."
                    onChange={handleTaxiParkChange}
                    value={data.additionalFeeDescription}
                  />
                </div>
              </div>
              <Button className="buttonTaxi" type="submit" variant="contained">
                Məlumatı yenilə
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UpdateTaxiPark;
