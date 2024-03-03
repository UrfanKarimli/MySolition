import { useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Logo from "../../images/Logo";
import { useAppStore } from "../../AppStore";
import { AuthData } from "../../auth/AuthWrapper";

const AppBar = styled(
  MuiAppBar
)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export default function Navbar() {
  const { logout } = AuthData();
  const [anchorEl, setAnchorEl] = useState(null);
  const updateOpen = useAppStore((state) => state.updateOpen);
  const dopen = useAppStore((state) => state.dopen);
  const user = JSON.parse(sessionStorage.getItem('currentUser'))
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // console.log("event.current", event.currentTarget)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: "black" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => updateOpen(!dopen)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <Logo />
          </Typography>
          <Typography sx={{
            color: "#fff", fontWeight: "600", textTransform: "capitalize", '&::first-letter': {
              color: '#FFBF00',
            },
          }}>
            {user}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle sx={{ fontSize: 30 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{
              top: "36px",
              left: "-14px"
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={logout}>Çıxış et</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
