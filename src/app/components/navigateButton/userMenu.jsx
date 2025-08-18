import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AccountCircle, Settings, Logout } from "@mui/icons-material";
import {logoutUser} from '../../login/services/authService';
import { useNavigate } from "react-router-dom";

export default function UserMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};


  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUserMenu = () => {
    logoutUser();
    navigate('/login');
  }

  return (
    <>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 180,
            boxShadow: 3,
          },
        }}
      >
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem> */}

        <MenuItem onClick={logoutUserMenu}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cerrar Sesión</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
