import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  Container,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip,
  Paper,
  ListItemIcon,
} from "@mui/material";
import {
  Search as SearchIcon,
  Language,
  Menu as MenuIcon,
  FavoriteBorder,
  AccountCircle,
  Notifications,
  Login,
  Person,
  CalendarMonth,
  Favorite,
  Logout,
  LocationOn,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "40px",
  backgroundColor: theme.palette.common.white,
  border: "1px solid #DDDDDD",
  "&:hover": {
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  transition: "box-shadow 0.2s ease",
  boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));

const ProfileButton = styled(Button)(({ theme }) => ({
  borderRadius: "40px",
  border: "1px solid #DDDDDD",
  padding: theme.spacing(0.5, 1),
  color: theme.palette.text.primary,
  "&:hover": {
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
}));

function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/hotels?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer", color: "primary.main", fontWeight: "bold" }}
          onClick={() => navigate("/")}
        >
          HotelBooking
        </Typography>

        {/* Search Bar */}
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "auto",
            maxWidth: 600,
            flex: 1,
            mx: 3,
            border: "1px solid #ddd",
            "&:hover": { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
          }}
        >
          <IconButton sx={{ p: "10px" }}>
            <LocationOn />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={t("nav.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton sx={{ p: "10px" }}>
            <CalendarMonth />
          </IconButton>
          <IconButton type="submit" sx={{ p: "10px" }}>
            <SearchIcon />
          </IconButton>
        </Paper>

        {/* Navigation Items */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button color="inherit" onClick={() => navigate("/become-host")}>
            {t("nav.becomeHost")}
          </Button>

          {/* Language Selector */}
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <LanguageSelector />
          </Box>

          {user ? (
            <>
              <IconButton onClick={handleMenu} color="inherit" sx={{ ml: 2 }}>
                {user.photoURL ? (
                  <Avatar src={user.photoURL} alt={user.displayName} />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  {t("nav.profile")}
                </MenuItem>
                <MenuItem onClick={() => navigate("/my-bookings")}>
                  {t("nav.myBookings")}
                </MenuItem>
                <MenuItem onClick={() => navigate("/wishlist")}>
                  {t("nav.wishlist")}
                </MenuItem>
                <MenuItem onClick={logout}>{t("nav.logout")}</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                {t("nav.login")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/signup")}
              >
                {t("nav.signup")}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
