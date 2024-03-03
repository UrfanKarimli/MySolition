import axios from 'axios';
import Swal from 'sweetalert2';
const BASE_URL = process.env.REACT_APP_BASE_URL



const ErrorHandle = (res) => {
    if (res.status == 400 ||
        res.status == 401 ||
        res.status == 402 ||
        res.status == 403) {
        Swal.fire({
            title: `${res.error}`,
            text: `${res.message}`,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#4f46e5",
            width: "400px",
            height: "400px",
        });
    } else if (res.status == 500) {
        Swal.fire({
            title: `${res.error}`,
            text: `${res.message}`,
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "#4f46e5",
            width: "400px",
            height: "400px",
        });
    } else {
        Swal.fire({
            position: "bottom-end",
            text: "Yeniden daxil olun",
            showCancelButton: false,
            timer: 1500,
        });
    }
}

const Get = (url, header) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`${BASE_URL}${url}`, header)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                ErrorHandle(err.response.data)
                reject(err.response.data)
                console.log(err.response.data);
            });
    });
};




const Put = (url, data, header) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`${BASE_URL}${url}`, data, header)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    });
};


const Post = (url, data, header) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${BASE_URL}${url}`, data, header)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    });
};

const Delete = (url, header) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`${BASE_URL}${url}`, header)
            .then((res) => {
                resolve(res.data);
                console.log(res.data.data);
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    });
};





