import SignIn from "../../auth/SignIn";
import TaxiPark from "../../pages/TaxiPark/TaxiPark";
import EinvoiceByTaxiPark from "../../pages/Einvoice/EinvoiceByTaxiPark";
import UpdateTaxiPark from "../../pages/TaxiPark/UpdateTaxiPark";
import NewTaxiPark from "../../pages/TaxiPark/NewTaxiPark";
import AddInvoice from "../../pages/Einvoice/AddInvoice";
import UpdateInvoice from "../../pages/Einvoice/UpdateInvoice";
import TransactionsApp from "../../pages/Addinformation/TransactionsApp";
import Popup from "../../pages/Addinformation/Popup";
import Addİnfo from "../../pages/Addinformation/Addİnfo";
import Dashboard from "../../pages/Addinformation/Dashboard";
import UpdateData from "../../pages/Addinformation/UpdateData";

export const nav = [
  {
    path: "/login",
    element: <SignIn />,
    isPrivate: false,
  },
  {
    path: "/",
    element: <Dashboard />,
    isPrivate: true,
  },
  {
    path: "/transactions",
    element: <TransactionsApp />,
    isPrivate: true,
  },
  {
    path: "/popup/:type",
    element: <Popup />,
    isPrivate: true,
  },
  {
    path: "/add-info",
    element: <Addİnfo />,
    isPrivate: true,
  },
  {
    path: "/update-data/:type/:id",
    element: <UpdateData />,
    isPrivate: true,
  },
  { 
    path: "/newTaxiPark",
    element: <NewTaxiPark />,
    isPrivate: true,
  },
  {
    path: "/taxiPark",
    element: <TaxiPark />,
    isPrivate: true,
  },
  {
    path: "/e-invoice",
    element: <EinvoiceByTaxiPark />,
    isPrivate: true,
  },
  {
    path: "/e-invoice/create",
    element: <AddInvoice />,
    isPrivate: true,
  },
  {
    path: "/updateTaxiPark/:id",
    element: <UpdateTaxiPark />,
    isPrivate: true,
  },
  {
    path: "/e-invoice/update/:id",
    element: <UpdateInvoice />,
    isPrivate: true,
  },
];
