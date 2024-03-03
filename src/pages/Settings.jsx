import SideNav from "../components/structure/SideNav";
import Box from "@mui/material/Box";
import Navbar from "../components/structure/NavBar";

const Settings = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <SideNav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Setting</h1>
        </Box>
      </Box>
    </>
  );
};

export default Settings;
