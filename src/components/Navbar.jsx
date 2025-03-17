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
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Search as SearchIcon,
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
  Close,
} from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";

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
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const mobileMenuItems = [
    { text: "Become a Host", onClick: () => navigate("/become-host") },
    ...(user
      ? [
          { text: "Profile", onClick: () => navigate("/profile") },
          { text: "My Bookings", onClick: () => navigate("/my-bookings") },
          { text: "Wishlist", onClick: () => navigate("/wishlist") },
          { text: "Logout", onClick: logout },
        ]
      : [
          { text: "Login", onClick: () => navigate("/login") },
          { text: "Sign Up", onClick: () => navigate("/signup") },
        ]),
  ];

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: { xs: "56px", sm: "64px" },
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 1, sm: 2 },
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              cursor: "pointer",
              color: "primary.main",
              fontWeight: "bold",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
              flexShrink: 0,
            }}
            onClick={() => navigate("/")}
          >
            HotelBooking
          </Typography>

          {/* Search Bar - Hide on very small screens */}
          {!isSmall && (
            <Paper
              component="form"
              onSubmit={handleSearch}
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: "auto",
                maxWidth: 600,
                flex: { xs: "none", md: 1 },
                mx: { xs: 1, sm: 2, md: 3 },
                border: "1px solid #ddd",
                "&:hover": { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
              }}
            >
              <IconButton sx={{ p: { xs: "6px", sm: "10px" } }}>
                <LocationOn />
              </IconButton>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search destinations, hotels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton sx={{ p: { xs: "6px", sm: "10px" } }}>
                <CalendarMonth />
              </IconButton>
              <IconButton type="submit" sx={{ p: { xs: "6px", sm: "10px" } }}>
                <SearchIcon />
              </IconButton>
            </Paper>
          )}

          {/* Navigation Items - Desktop */}
          {!isMobile ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1, sm: 2 },
              }}
            >
              <Button
                color="inherit"
                onClick={() => navigate("/become-host")}
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                Become a Host
              </Button>

              {user ? (
                <>
                  <IconButton
                    onClick={handleMenu}
                    color="inherit"
                    sx={{ ml: { xs: 1, sm: 2 } }}
                  >
                    {user.photoURL ? (
                      <Avatar
                        src={user.photoURL}
                        alt={user.displayName}
                        sx={{ width: 32, height: 32 }}
                      />
                    ) : (
                      <AccountCircle />
                    )}
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        width: 200,
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/my-bookings")}>
                      My Bookings
                    </MenuItem>
                    <MenuItem onClick={() => navigate("/wishlist")}>
                      Wishlist
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/login")}
                    sx={{ display: { xs: "none", sm: "flex" } }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => navigate("/signup")}
                    sx={{
                      display: { xs: "none", sm: "flex" },
                      px: { xs: 1.5, sm: 2 },
                      py: { xs: 0.5, sm: 0.75 },
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Box>
          ) : (
            // Mobile menu button
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Container>
      </Toolbar>

      {/* Mobile Search - Only visible on very small screens */}
      {isSmall && (
        <Box sx={{ px: 2, pb: 1, bgcolor: "background.paper" }}>
          <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              border: "1px solid #ddd",
              "&:hover": { boxShadow: "0 2px 4px rgba(0,0,0,0.1)" },
            }}
          >
            <IconButton sx={{ p: "6px" }}>
              <LocationOn />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search destinations, hotels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: "6px" }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      )}

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 300 } },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            HotelBooking
          </Typography>
          <IconButton onClick={toggleMobileMenu}>
            <Close />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {mobileMenuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => {
                  item.onClick();
                  setMobileMenuOpen(false);
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
