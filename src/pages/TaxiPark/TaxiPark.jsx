import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditableDataGrid from "../../components/EditableTabel";
import SideNav from "../../components/structure/SideNav";
import Loading from "../../components/Loading";
import Navbar from "../../components/structure/NavBar";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const TaxiPark = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);

  const getData = async (url) => {
    try {
      let response = await axios(url);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      handleSwalError(error);
    }
  };

  const handleSwalError = (error) => {
    Swal.fire({
      icon: "error",
      title: `Oops...${error.name}`,
      text: `${error.message}`,
    });
  };

  const handleDelete = (id, endpoint) => {
    Swal.fire({
      title: "Əminsiniz?",
      text: "Əgər bu məlumatı silsəniz, bir daha geri qaytara bilməyəcəksiniz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Bəli, sil!",
      cancelButtonText: "xeyir, geri qayıt",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/${endpoint}/${id}`)
          .then(() => {
            setData((prevData) => prevData.filter((item) => item.id !== id));
            handleDeleteSuccess();
          })
          .catch((error) => {
            handleSwalError(error);
          });
      }
    });
  };

  const handleDeleteSuccess = () => {
    Swal.fire({
      title: "Silindi!",
      text: "Məlumat uğurla silindi.",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${BASE_URL}/taxiPark`;
        const endpoint = "taxiPark";
        const column = [
          { field: "id", headerName: "ID", width: 200 },
          {
            field: "taxiParkName",
            headerName: "Taxi Park adı",
            width: 150,
          },
          {
            field: "legalName",
            headerName: "Hüquqi adı",
            width: 150,
          },
          {
            field: "taxNumber",
            headerName: "VÖEN",
            width: 150,
          },
          {
            field: "driverBankAccountFeePercentage",
            headerName: "Bank hesabı üzrə (VÖEN-li)",
            width: 150,
          },
          {
            field: "driverCardFeePercentage",
            headerName: "Avtomatik kart üzrə (VÖEN-siz)",
            width: 150,
          },
          {
            field: "fleetBankAccountFeePercentage",
            headerName: "Bank hesabı üzrə (VÖEN-li)",
            width: 150,
          },
          {
            field: "fleetCardFeePercentage",
            headerName: "Avtomatik kart üzrə (VÖEN-siz)",
            width: 150,
          },
          {
            field: "serverFee",
            headerName: "Server Xidmət haqqı (AZN)",
            width: 150,
          },
          {
            field: "additionalFee",
            headerName: "Fee",
            width: 150,
          },
          {
            field: "additionalFeeDescription",
            headerName: "Təsvir",
            width: 150,
          },
          {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            width: 100,
            renderCell: (params) => (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(params.row.id, endpoint)}
              >
                Delete
              </Button>
            ),
          },
          {
            field: "update",
            headerName: "Update",
            sortable: false,
            width: 100,
            renderCell: (params) => (
              <Link to={`/updateTaxiPark/${params.row.id}`}>
                <Button variant="contained" color="primary">
                  Update
                </Button>
              </Link>
            ),
          },
        ];
        setColumns(column);
        await getData(url);
      } catch (error) {
        console.error("Məlumatları gətirmə zamanı xəta:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, padding: "51px", width: 0 }}>
          <h1 style={{ marginBlockEnd: 0, fontFamily: "Poppins" }}>
            Taxi Park
          </h1>
          <Box
            height={30}
            marginBottom={3}
            justifyContent={"flex-end"}
            display={"flex"}
          >
            <Button
              variant="contained"
              className="button"
              onClick={() => {
                navigate("/newTaxiPark");
              }}
            >
              Yeni Taxi Park
            </Button>
          </Box>
          {loading ? (
            <Loading />
          ) : (
            <EditableDataGrid
              columns={columns}
              rows={data}
              handleDelete={handleDelete}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default TaxiPark;
