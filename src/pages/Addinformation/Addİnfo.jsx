import Sidenav from "../../components/structure/SideNav";
import Navbar from "../../components/structure/NavBar";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { Box, Button, Select, MenuItem, TextField, Checkbox, FormControl, Autocomplete } from '@mui/material';
import Swal from 'sweetalert2';



const BASE_URL = process.env.REACT_APP_BASE_URL;


const Addİnfo = () => {
    const navigate = useNavigate()
    const [selectedOption, setSelectedOption] = useState(0);
    const [open, setOpen] = useState(false);
    const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectDebt, setSelectDebt] = useState([])
    const [data, setData] = useState([])
    const [userName, setUserName] = useState(null)
    const [token, setToken] = useState("")
    const [debtValue, setDebtValue] = useState(null)
    const [sources, setSources] = useState("")
    console.log("sources", sources);


    const [income, setIncome] = useState({
        // id: Date.now(),
        description: null,
        amount: null,
        incomeSource: null,
        date: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
        username: userName,
    });


    const [expense, setExpense] = useState({
        // id: Date.now(),
        description: null,
        amount: null,
        date: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
        expenseDestination: null,
        relatedToDebt: false,
        relatedDebtId: null,
    });
    const [debt, setDebt] = useState({
        // id: Date.now(),
        description: null,
        amount: null,
        debtSource: null,
        date: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
    });



    const postData = async () => {
        try {
            let endpoint = '';
            let data = null;

            switch (selectedOption) {
                case 1:
                    if (!income.description || !income.amount || !income.incomeSource) {
                        throw new Error("Zəhmət olmasa məlumatları tam daxil edin.");
                    }
                    endpoint = '/income';
                    data = income;
                    break;
                case 2:
                    if (!expense.description || !expense.amount || !expense.date || !expense.expenseDestination) {
                        throw new Error("Zəhmət olmasa məlumatları tam daxil edin.");
                    }
                    endpoint = '/expense';
                    data = expense;
                    break;
                case 3:
                    if (!debt.description || !debt.amount || !debt.debtSource) {
                        throw new Error("Zəhmət olmasa məlumatları tam daxil edin.");
                    }
                    endpoint = '/debt';
                    data = debt;
                    break;
                default:
                    throw new Error("Seçilmiş əməliyyat mövcud deyil.");
            }
            const response = await axios.post(`${BASE_URL}${endpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }, data);
            console.log("data", data);
            Swal.fire({
                icon: "success",
                title: "Məlumat uğurla əlavə edildi",
                text: `${response.data.message}`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/");
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
                showConfirmButton: false,
                timer: 2000
            });
        }
    };



    const GetSource = async () => {
        try {
            let path = "";

            if (selectedOption === 1) {
                path = 'income';
            } else if (selectedOption === 2) {
                path = 'expense';
            } else if (selectedOption === 3) {
                path = 'debt';
            }
            const response = await axios.get(`${BASE_URL}/get-user-defined-sources?type=${path}`);
            setData(response.data.sources);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Oopsaaa...${error.name}`,
                text: `${error.message}`,
            });
        }
    }



    const getDebt = async () => {
        try {
            setLoading(true);
            let response = await axios(`${BASE_URL}/debt`);
            setSelectDebt(response.data.debts)
        } catch (error) {
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
        getDebt();
        GetSource();
        setToken(JSON.parse(sessionStorage.getItem("access_token")))
        setUserName(JSON.parse(sessionStorage.getItem('currentUser')))
    }, [selectedOption]);


    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
        // console.log("value", e.target.value);

        // if (name === 'date') 
        //     const formattedDate = formatInputDate(value);
        //     if (formattedDate.length <= 10) {
        //         setExpense({ ...expense, [name]: formattedDate });
        //     }
        // } else {
        //     setExpense({ ...expense, [name]: value , relatedToDebt: checked});
        //     setIsCheckboxSelected(checked);
        // }
    };

    const handleIncomeChange = (e) => {
        const { name, value } = e.target;
        setIncome({ ...income, [name]: value, });
    };

    const handleCheckboxChange = (e) => {
        setExpense({ ...expense, relatedToDebt: e.target.checked });
        setIsCheckboxSelected(e.target.checked);

    };


    const formatInputDate = (inputDate) => {
        const parts = inputDate.split('-');
        if (parts.length === 3) {
            const [year, month, day] = parts;
            return `${year}-${month}-${day}`;
        }
        return inputDate;
    };

    const handleDebtChange = (e) => {
        const { name, value } = e.target;
        setDebt({ ...debt, [name]: value });
    };

    const handleChange = (e) => {
        setSelectedOption(parseInt(e.target.value));
        setOpen(!open);
    };

    const disableScroll = (e) => {
        e.target.blur();
    };

    const options = [
        { label: 'The Godfather', id: 1 },
        { label: 'Pulp Fiction', id: 2 },
    ];

    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", height: "100vh" }}>
                <Sidenav />
                <Box component="main" sx={{ margin: "80px auto 0" }}>
                    <Box>
                        <h1>Məlumat daxil edin</h1>
                        <Box>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }} >
                                <FormControl variant="outlined" fullWidth margin="normal">
                                    <Select
                                        id="type-label"
                                        onChange={handleChange}
                                        value={selectedOption}
                                    >
                                        <MenuItem value={0}>
                                            <em>------------Təsnifatı seçin----------</em></MenuItem>
                                        <MenuItem value={1}>Gəlir</MenuItem>
                                        <MenuItem value={2}>Xərc</MenuItem>
                                        <MenuItem value={3}>Borc</MenuItem>
                                    </Select>
                                </FormControl>
                                {selectedOption === 1 && (
                                    <FormControl variant="outlined" fullWidth margin="normal" sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <TextField
                                                id="outlined-select-currency"
                                                select
                                                name="incomeSource"
                                                label="Gəlir mənbəyi"
                                                fullWidth
                                                sx={{ width: "55%" }}
                                                onChange={handleIncomeChange}
                                            >
                                                {data.map((option) => (
                                                    <MenuItem key={option.id} value={option.sourceName}>
                                                        {option.sourceName}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <Button
                                                type="button"
                                                variant="outlined"
                                                color="primary"
                                                sx={{ width: "40%" }}
                                                onClick={() => { navigate("/popup/income") }}
                                                fullWidth
                                            >
                                                Əlavə et
                                            </Button>
                                        </Box>

                                        <TextField
                                            variant="outlined"
                                            id="income-description"
                                            type="text"
                                            name="description"
                                            onChange={handleIncomeChange}
                                            fullWidth
                                            label="Gəlir təsviri"

                                        />
                                        <TextField
                                            variant="outlined"
                                            id="income-amount"
                                            type="number"
                                            name="amount"
                                            onWheel={disableScroll}
                                            onChange={handleIncomeChange}
                                            fullWidth
                                            label="Gəlir məbləği"

                                        />
                                        <TextField
                                            variant="outlined"
                                            id="income-date"
                                            type="datetime-local"
                                            name="date"
                                            value={income.date}
                                            onChange={handleIncomeChange}
                                            margin="normal"
                                            fullWidth
                                            label="Tarix seç"
                                            InputLabelProps={{ shrink: true, style: { textAlign: 'center' } }}

                                        />
                                    </FormControl>
                                )}
                                {selectedOption === 2 && (
                                    <div>
                                        <FormControl variant="outlined" fullWidth margin="normal" sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                {/* <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    label="xərcin təyinatı"
                                                    fullWidth
                                                    sx={{ width: "55%" }}
                                                    name="expenseDestination"
                                                    onChange={handleExpenseChange}
                                                >
                                                    {data.map((option) => (
                                                        <MenuItem key={option.id} value={option.sourceName}>
                                                            {option.sourceName}
                                                        </MenuItem>
                                                    ))}
                                                </TextField> */}
                                                <Autocomplete
                                                    sx={{ width: "62%" }}
                                                    value={sources}
                                                    onChange={(event, newValue) => {
                                                        setSources(newValue);
                                                        handleExpenseChange(event);
                                                    }}
                                                    options={options}
                                                    isOptionEqualToValue={(option, value) => option.label === value}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="xərcin təyinatı"
                                                            fullWidth
                                                            name="expenseDestination"
                                                        />
                                                    )}
                                                    noOptionsText="Seçim yoxdur"
                                                />
                                                <Button
                                                    type="button"
                                                    onClick={() => { navigate("/popup/expense") }}
                                                    variant="outlined"
                                                    color="primary"
                                                    fullWidth
                                                    sx={{ width: "33%" }}
                                                >
                                                    əlavə et
                                                </Button>
                                            </Box>
                                            <Box sx={{ display: "flex", gap: "15px", alignItems: "center", color: "#42a5f5" }}>
                                                <label htmlFor="expense-destination">borcun qaytarilmasidir ?</label>
                                                <Checkbox sx={{ height: "40px" }}
                                                    id="expense-destination"
                                                    type="checkbox"
                                                    name="relatedToDebt"
                                                    value={expense.relatedToDebt}
                                                    onChange={handleCheckboxChange}
                                                />
                                            </Box>
                                            <Box sx={{ display: !isCheckboxSelected ? 'none' : 'block' }} >
                                                {/* <TextField
                                                    id="outlined-select-currency"
                                                    select
                                                    label="Select"
                                                    name="relatedDebtId"
                                                    fullWidth
                                                    helperText="Əlaqəli olduğu borcu seçin"
                                                    onChange={handleExpenseChange}
                                                >
                                                    {selectDebt.map((item) => (
                                                        <MenuItem key={item.id} value={item.id} >
                                                            mənbə {item.debtSource} - məbləğ {item.totalAmount}
                                                        </MenuItem>
                                                    ))}
                                                </TextField> */}

                                                <Autocomplete
                                                    value={debtValue}
                                                    onChange={(e, newValue) => {
                                                        setDebtValue(newValue.id);
                                                        handleExpenseChange(e);
                                                        console.log("value", newValue.id);
                                                    }}
                                                    options={selectDebt}
                                                    getOptionLabel={(option) => `mənbə ${option.debtSource} - məbləğ ${option.totalAmount}`}
                                                    fullWidth
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Select"
                                                            name="relatedDebtId"
                                                            fullWidth
                                                            helperText="Əlaqəli olduğu borcu seçin"
                                                        />
                                                    )}
                                                    noOptionsText="Seçim yoxdur"
                                                />
                                            </Box>
                                            <TextField
                                                variant="outlined"
                                                id="expense-description"
                                                type="text"
                                                name="description"
                                                onChange={handleExpenseChange}
                                                margin="normal"
                                                fullWidth
                                                label="xərcin təsviri  "
                                            />
                                            <TextField
                                                id="expense-amount"
                                                type="number"
                                                name="amount"
                                                onWheel={disableScroll}
                                                onChange={handleExpenseChange}
                                                margin="normal"
                                                fullWidth
                                                label="xərcin məbləği"
                                            />
                                            <TextField
                                                id="expense-date"
                                                type="datetime-local"
                                                name="date"
                                                value={expense.date}
                                                onChange={handleExpenseChange}
                                                margin="normal"
                                                fullWidth
                                                label="tarix seç"
                                                InputLabelProps={{ shrink: true, style: { textAlign: 'center' } }}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                                {selectedOption === 3 && (
                                    <div>
                                        <FormControl variant="outlined" fullWidth margin="normal" sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }} >
                                                <TextField
                                                    id="debt-source"
                                                    select
                                                    label="borc mənbəyi"
                                                    name="debtSource"
                                                    fullWidth
                                                    sx={{ width: "55%" }}
                                                    onChange={handleDebtChange}
                                                >
                                                    {data.map((option) => (
                                                        <MenuItem key={option.id} value={option.sourceName}>
                                                            {option.sourceName}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                <Button
                                                    type="button"
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => { navigate("/popup/debt") }}
                                                    fullWidth
                                                    sx={{ width: "40%" }}
                                                >
                                                    əlavə et
                                                </Button>
                                            </Box>
                                            <TextField
                                                id="debt-description"
                                                type="text"
                                                name="description"
                                                onChange={handleDebtChange}
                                                margin="normal"
                                                fullWidth
                                                label="borc təsviri"
                                            />
                                            <TextField
                                                id="debt-amount"
                                                type="number"
                                                name="amount"
                                                onWheel={disableScroll}
                                                onChange={handleDebtChange}
                                                margin="normal"
                                                fullWidth
                                                label="borc məbləği"
                                            />
                                            <TextField
                                                id="debt-date"
                                                type="datetime-local"
                                                name="date"
                                                onChange={handleDebtChange}
                                                margin="normal"
                                                fullWidth
                                                value={debt.date}
                                                label="tarix seç"
                                                InputLabelProps={{ shrink: true, style: { textAlign: 'center' } }}
                                            />
                                        </FormControl>
                                    </div>
                                )}
                            </Box>
                            <Button
                                fullWidth
                                sx={{
                                    backgroundColor: "#FFA500", padding: "2px", width: "100%", textTransform: "lowercase",
                                    '&:hover': {
                                        backgroundColor: '#FFBF00',
                                    },
                                }}
                                variant="contained"
                                onClick={postData}>
                                Məlumatı yaddaşa yaz
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Addİnfo;
