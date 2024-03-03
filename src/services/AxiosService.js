import axios from "axios";
import Swal from 'sweetalert2';
const BASE_URL = process.env.REACT_APP_BASE_URL


const ErrorHandle = (res) => {
    let message = '';
    switch (res.status) {
        case 400:
        case 401:
        case 402:
        case 403:
            message = `${res.error} - ${res.message}`;
            break;
        case 500:
            message = `${res.error} - ${res.message}`;
            break;
        default:
            message = "Yenidən daxil olun";
    }

    Swal.fire({
        title: message,
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#4f46e5",
        width: "400px",
        height: "400px",
        timer: 1500,
    });
};


const Get = async (url, header) => {
    try {
        const res = await axios.get(`${BASE_URL}${url}`, header);
        return res.data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: `Oops...${error.name}`,
            text: `${error.message}`,
        });
        ErrorHandle(error.response.data)
        console.error('GET error:', error.response.data);
        throw error.response.data;
    }
};

const Put = async (url, data, header) => {
    try {
        const res = await axios.put(url, data, header);
        return res.data;
    } catch (error) {
        
        ErrorHandle(error.response.data)
        console.error('PUT error:', error.response.data);
        throw error.response.data;
    }
};

const Post = async (url, data, header) => {
    try {
        const res = await axios.post(url, data, header);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Məlumat uğurla əlavə edildi",
            text: `${res.data.message}`,
            showConfirmButton: false,
            timer: 2500
        });

        return res.data;
    } catch (error) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Oops...",
            text: error.message,
            showConfirmButton: false,
            timer: 3000
        });
        ErrorHandle(error.response.data)
        console.error('POST error:', error.response.data);
        throw error.response.data;
    }
};

const Delete = async (url, header) => {
    try {
        const res = await axios.delete(url, header);
        Swal.fire({
            title: "Silindi!",
            text: "Məlumat uğurla silindi.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        });
        console.log(res.data.data);
        return res.data;
    } catch (error) {
        Swal.fire({
            title: "Error!",
            text: `${error.message}`,
            icon: "error"
        });
        ErrorHandle(error.response.data)
        console.error('DELETE error:', error.response.data);
        throw error.response.data;
    }
};

export {Get, Delete, Put, Post}