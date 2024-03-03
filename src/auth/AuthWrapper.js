import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { RenderRoutes, } from "../components/structure/RenderNavigation";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

// const BASE_URL = process.env.REACT_APP_BASE_URL

const BASE_URL = "https://tracker.msolution.az"


const AuthContext = createContext();

export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });
  const [token, setToken] = useState("")
  const navigate = useNavigate()

  // const refreshAccessToken = async (username) => {
  //   try {
  //     const response = await axios.post(`${BASE_URL}/refresh`, token);
  //     // console.log("response", response.data.data.type)
  //     if (response.data.data.type) {
  //       let type = response.data.data.type
  //       setUser({ name: username, isAuthenticated: type });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Xəta!',
  //       text: error.message,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   refreshAccessToken();
  // }, [token]);




  // !=================


  sessionStorage.setItem("currentUser", JSON.stringify(user.name))



  // !================
  // let abbb = async () => {
  //   const res = await axios.post("https://tracker.msolution.az/refresh" )
  //   console.log("res", res)
  // }

  // abbb()

  const login = async (username, password) => {
    try {
      // const response = await axios.post(`${BASE_URL}/login`, {
      //   username: username,
      //   password: password
      // });
      if (username === "urfan") {
        setUser({ name: username, isAuthenticated: true });
        Swal.fire({
          icon: 'success',
          title: `Welcome ${username}`,
          text: 'İstifadəçi uğurla giriş etdi!',
          showConfirmButton: false,
          timer: 1000,
        })
        navigate("/");

      }
      // if (!response.status === 401) {
      //   setUser({ name: username, isAuthenticated: true });
      //   // console.log("response", username)
      //   // sessionStorage.setItem("currentUser", JSON.stringify(username))
      //   sessionStorage.setItem("access_token", JSON.stringify(response.data.access_token))
      //   sessionStorage.setItem("refresh_token", JSON.stringify(response.data.refresh_token))


      //   // setToken(response.data.data.refreshToken)
      //   // refreshAccessToken(username);
      // Swal.fire({
      //   icon: 'success',
      //   title: `Welcome ${username}`,
      //   text: 'İstifadəçi uğurla giriş etdi!',
      //   showConfirmButton: false,
      //   timer: 1000,
      // });
      //   navigate("/");
      // }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Xəta!',
        text: 'Giriş zamanı bir xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
      });
    }
  };

  const logout = async () => {
    try {
      const result = await Swal.fire({
        title: 'Çıxış etmək istədiyinizdən əminsiniz ?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Çıxış et',
        denyButtonText: `Geri qayıt`,
      });
      if (result.isConfirmed) {
        setUser({ ...user, isAuthenticated: false });
        navigate("/login");
        Swal.fire(
          'Çıxış edildi!',
          '',
          'success');
      }

    } catch (error) {
      console.error("error", error);

      Swal.fire({
        icon: 'error',
        title: 'Xəta!',
        text: 'Çıxış zamanı bir xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.',
      });
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <>
        <RenderRoutes />
      </>
    </AuthContext.Provider>
  );
};
