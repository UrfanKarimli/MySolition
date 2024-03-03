import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Sidenav from "../../components/structure/SideNav";
import Navbar from "../../components/structure/NavBar";
import { Box, Button, MenuItem, TextField, Checkbox, FormControl } from '@mui/material';
import Swal from 'sweetalert2';

const BASE_URL = process.env.REACT_APP_BASE_URL


const UpdateData = () => {
    const { type, id } = useParams();

    const navigate = useNavigate()
    const [token, setToken] = useState("")
    const [sessionData, setSessionData] = useState([])
    const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);
    const [selectDebt, setSelectDebt] = useState([])
    const [data, setData] = useState([])
    const [userName, setUserName] = useState(null)
    // console.log("datata", sessionData)
    const [income, setIncome] = useState({
        id: sessionData.id,
        description: null,
        amount: null,
        incomeSource: null,
        username: userName,
    });
    const [expense, setExpense] = useState({
        id: sessionData.id,
        description: null,
        amount: null,
        date: null,
        expenseDestination: null,
        relatedToDebt: false,
        relatedDebtId: null,
    });

    const [debt, setDebt] = useState({
        id: sessionData.id,
        description: null,
        amount: null,
    });


    const handleUpdate = async () => {
        try {
            let data = null;
            const result = await Swal.fire({
                title: 'Dəyişiklikləri yadda saxlamaq istəyirsiniz?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            });

            if (result.isConfirmed) {
                switch (type) {
                    case "income":
                        if (!income.description || !income.amount || !income.incomeSource) {
                            throw new Error("Zəhmət olmasa məlumatları tam daxil edin.");
                        }
                        data = income;
                        break;
                    case "expense":
                        if (!expense.description || !expense.amount || !expense.date || !expense.expenseDestination) {
                            throw new Error("Zəhmət olmasa məlumatları tam daxil edin.");
                        }
                        data = expense;
                        break;
                    case "debt":
                        if (!debt.description || !debt.amount) {
                            throw new Error("Zəhmət olmasa məlumatları tam daxil edin.");
                        }
                        data = debt;
                        break;
                    default:
                        throw new Error("Seçilmiş əməliyyat mövcud deyil.");
                }

                const response = await axios.put(`${BASE_URL}/${type}/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }, data);
                Swal.fire('Saved!', '', 'success');
                navigate('/trans');
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Xəta',
                text: `Məlumat güncəllənmədı. Xəta: ${error.message}`,
            });
        }
    };


    const handleIncomeChange = (e) => {
        const { name, value } = e.target;
        setIncome({ ...income, [name]: value, });
    };


    const GetSource = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get-user-defined-sources?type=${type}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setData(response.data.sources);
        } catch (error) {
            console.error("error", error);
            Swal.fire({
                icon: "error",
                title: `Oopsaaa...${error.name}`,
                text: `${error.message}`,
            });
        }
    }


    const getDebt = async () => {
        try {
            let response = await axios(`${BASE_URL}/debt`);
            setSelectDebt(response.data.debts)
        } catch (error) {
            console.error("error", error);

            Swal.fire({
                icon: "error",
                title: `Oopsaaa...${error.name}`,
                text: `${error.message}`,
            });
        } finally {
        }
    }


    const selectData = () => {

        setSessionData(JSON.parse(sessionStorage.getItem('selectrow')))
        setUserName(JSON.parse(sessionStorage.getItem('currentUser')))

        const incomeData = JSON.parse(sessionStorage.getItem('selectrow'))
        if (incomeData) {
            setIncome({
                description: incomeData.description,
                amount: incomeData.amount,
                incomeSource: incomeData.source_or_destination,
            })
            setExpense(
                {
                    description: incomeData.description,
                    amount: incomeData.amount,
                    date: incomeData.date,
                    expenseDestination: incomeData.source_or_destination,
                    relatedToDebt: incomeData.relatedDebtId ? true : false,
                    relatedDebtId: incomeData.relatedDebtId,
                }
            )
            setDebt(
                {
                    description: incomeData.description,
                    amount: incomeData.amount,
                }
            )
        }

    }
    useEffect(() => {
        setToken(JSON.parse(sessionStorage.getItem("access_token")))
        selectData();
        GetSource();
        getDebt();
    }, []);




    const handleExpenseChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
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





    return (
        <>
            <Navbar />
            <Box sx={{ display: "flex", height: "100vh" }}>
                <Sidenav />
                <Box component="main" sx={{ margin: "80px auto 0" }}>
                    {
                        !sessionData ? <Loading /> :
                            <Box>
                                <h1>Məlumat daxil edin</h1>
                                <Box>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }} >
                                        {type === 'income' && (
                                            <FormControl variant="outlined" fullWidth margin="normal" sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                    <TextField
                                                        id="outlined-select-currency"
                                                        select
                                                        name="incomeSource"
                                                        label="Gəlir mənbəyi"
                                                        fullWidth
                                                        InputLabelProps={{ shrink: true, }}
                                                        value={income.incomeSource}
                                                        onChange={handleIncomeChange}
                                                    >
                                                        {data.map((option) => (
                                                            <MenuItem key={option.id} value={option.sourceName}>
                                                                {option.sourceName}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Box>
                                                <TextField
                                                    variant="outlined"
                                                    id="income-description"
                                                    type="text"
                                                    name="description"
                                                    InputLabelProps={{ shrink: true, }}
                                                    value={income.description}
                                                    onChange={handleIncomeChange}
                                                    fullWidth
                                                    label="Gəlir təsviri"
                                                />
                                                <TextField
                                                    variant="outlined"
                                                    id="income-amount"
                                                    type="number"
                                                    name="amount"
                                                    InputLabelProps={{ shrink: true, }}
                                                    value={income.amount}
                                                    onChange={handleIncomeChange}
                                                    fullWidth
                                                    label="Gəlir məbləği"
                                                />
                                            </FormControl>
                                        )}
                                        {type === 'expense' && (
                                            <Box>
                                                <FormControl variant="outlined" fullWidth margin="normal" sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                                                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                        <TextField
                                                            id="outlined-select-currency"
                                                            select
                                                            label="xərcin təyinatı"
                                                            fullWidth
                                                            sx={{ width: "55%" }}
                                                            InputLabelProps={{ shrink: true, }}
                                                            name="expenseDestination"
                                                            value={income.incomeSource}
                                                            onChange={handleExpenseChange}
                                                        >
                                                            {data.map((option) => (
                                                                <MenuItem key={option.id} value={option.sourceName}>
                                                                    {option.sourceName}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                        <Button
                                                            type="button"
                                                            onClick={() => { navigate("/popup/expense") }}
                                                            variant="outlined"
                                                            color="primary"
                                                            fullWidth
                                                            sx={{ width: "40%" }}
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
                                                            InputLabelProps={{ shrink: true, }}
                                                            value={expense.relatedToDebt}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                    </Box>
                                                    <Box sx={{ display: !isCheckboxSelected ? 'none' : 'block' }} >
                                                        <TextField
                                                            id="outlined-select-currency"
                                                            select
                                                            label="Select"
                                                            name="relatedDebtId"
                                                            fullWidth
                                                            helperText="Əlaqəli olduğu borcu seçin"
                                                            InputLabelProps={{ shrink: true, }}
                                                            value={expense.relatedDebtId}
                                                            onChange={handleExpenseChange}
                                                        >
                                                            {selectDebt.map((item) => (
                                                                <MenuItem key={item.id} value={item.id} >
                                                                    mənbə {item.debtSource} - məbləğ {item.totalAmount}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Box>
                                                    <TextField
                                                        variant="outlined"
                                                        id="expense-description"
                                                        type="text"
                                                        name="description"
                                                        InputLabelProps={{ shrink: true, }}
                                                        value={expense.description}
                                                        onChange={handleExpenseChange}
                                                        margin="normal"
                                                        fullWidth
                                                        label="xərcin təsviri  "
                                                    />
                                                    <TextField
                                                        id="expense-amount"
                                                        type="number"
                                                        name="amount"
                                                        InputLabelProps={{ shrink: true, }}
                                                        value={expense.amount}
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
                                            </Box>
                                        )}
                                        {type === 'debt' && (
                                            <Box>
                                                <FormControl variant="outlined" fullWidth margin="normal" sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                                                    <TextField
                                                        id="debt-description"
                                                        type="text"
                                                        name="description"
                                                        InputLabelProps={{ shrink: true, }}
                                                        value={debt.description}
                                                        onChange={handleDebtChange}
                                                        margin="normal"
                                                        fullWidth
                                                        label="borc təsviri"
                                                    />
                                                    <TextField
                                                        id="debt-amount"
                                                        type="number"
                                                        name="amount"
                                                        InputLabelProps={{ shrink: true, }}
                                                        value={debt.amount}
                                                        onChange={handleDebtChange}
                                                        margin="normal"
                                                        fullWidth
                                                        label="borc məbləği"
                                                    />
                                                </FormControl>
                                            </Box>
                                        )}
                                    </Box>
                                    <Button
                                        fullWidth
                                        sx={{
                                            backgroundColor: "#FFA500", padding: "2px", width: "100%", textTransform: "none",
                                            '&:hover': {
                                                backgroundColor: '#FFBF00',
                                            },
                                        }}
                                        variant="contained"
                                        onClick={handleUpdate}>
                                        Dəyişiklikləri yaddaşa yaz
                                    </Button>
                                </Box>
                            </Box>}
                </Box>
            </Box>
        </>
    );

}

export default UpdateData