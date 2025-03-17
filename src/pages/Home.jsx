import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
  Paper,
  InputBase,
  IconButton,
  Chip,
  Stack,
  Divider,
  useTheme,
  alpha,
  useMediaQuery,
  Popover,
  TextField,
  MenuItem,
  Menu,
  ClickAwayListener,
  Popper,
  Grow,
} from "@mui/material";
import {
  Search as SearchIcon,
  LocationOn,
  CalendarMonth,
  Person,
  Pool,
  Spa,
  BeachAccess,
  Landscape,
  Restaurant,
  FitnessCenter,
  KeyboardArrowDown,
  Add,
  Remove,
} from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { properties } from "../data/properties";
import PropertyGrid from "../components/PropertyGrid";
import Footer from "../components/Footer";

// Featured destinations data
const destinations = [
  {
    name: "Bali, Indonesia",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    properties: 1204,
  },
  {
    name: "Santorini, Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    properties: 873,
  },
  {
    name: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    properties: 645,
  },
  {
    name: "Swiss Alps",
    image:
      "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    properties: 912,
  },
];

// Category icons
const categories = [
  { id: "all", label: "All", icon: null },
  { id: "beach", label: "Beach", icon: <BeachAccess /> },
  { id: "mountain", label: "Mountain", icon: <Landscape /> },
  { id: "spa", label: "Spa", icon: <Spa /> },
  { id: "pool", label: "Pool", icon: <Pool /> },
  { id: "dining", label: "Fine Dining", icon: <Restaurant /> },
  { id: "fitness", label: "Fitness", icon: <FitnessCenter /> },
];

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationAnchorEl, setLocationAnchorEl] = useState(null);
  const [availableLocations, setAvailableLocations] = useState([]);

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guestCount, setGuestCount] = useState(1);
  const [calendarAnchorEl, setCalendarAnchorEl] = useState(null);
  const [guestAnchorEl, setGuestAnchorEl] = useState(null);

  const openCalendar = Boolean(calendarAnchorEl);
  const openGuestMenu = Boolean(guestAnchorEl);
  const openLocation = Boolean(locationAnchorEl);

  const handleCalendarClick = (event) => {
    setCalendarAnchorEl(event.currentTarget);
  };

  const handleCalendarClose = () => {
    setCalendarAnchorEl(null);
  };

  const handleGuestClick = (event) => {
    setGuestAnchorEl(event.currentTarget);
  };

  const handleGuestClose = () => {
    setGuestAnchorEl(null);
  };

  const handleGuestIncrement = () => {
    setGuestCount((prev) => Math.min(prev + 1, 10));
  };

  const handleGuestDecrement = () => {
    setGuestCount((prev) => Math.max(prev - 1, 1));
  };

  const handleLocationClick = (event) => {
    setLocationAnchorEl(event.currentTarget);
  };

  const handleLocationClose = () => {
    setLocationAnchorEl(null);
  };

  const handleLocationSelect = (location) => {
    setLocationQuery(location);
    setLocationAnchorEl(null);
  };

  const categoryToPropertyMap = {
    beach: "beachAccess",
    mountain: "mountainView",
    spa: "spa",
    pool: "pool",
    dining: "restaurant",
    fitness: "gym",
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const featured = properties
        .filter((property) => property.featured)
        .slice(0, 8);
      setFeaturedProperties(featured);
      setFilteredProperties(featured);
      const locations = properties.map(
        (property) => `${property.location.city}, ${property.location.country}`
      );
      const uniqueLocations = [...new Set(locations)];
      setAvailableLocations(uniqueLocations);

      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProperties(featuredProperties);
    } else {
      const amenityToFilter = categoryToPropertyMap[selectedCategory];
      const filtered = featuredProperties.filter((property) =>
        property.amenities.includes(amenityToFilter)
      );
      setFilteredProperties(filtered);
    }
  }, [selectedCategory, featuredProperties]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleCategoryClick = (categoryId) => {
    if (categoryId === "all") {
      setSelectedCategory("all");
    } else {
      navigate(`/hotels?category=${categoryId}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Build search params
    const params = new URLSearchParams();

    if (locationQuery.trim()) {
      params.append("location", locationQuery.trim());
    } else if (searchQuery.trim()) {
      params.append("search", searchQuery.trim());
    }

    if (checkInDate) {
      params.append("checkIn", checkInDate.toISOString().split("T")[0]);
    }

    if (checkOutDate) {
      params.append("checkOut", checkOutDate.toISOString().split("T")[0]);
    }

    if (guestCount > 1) {
      params.append("guests", guestCount);
    }

    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", sm: "70vh", md: "85vh" },
          width: "100%",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
          },
        }}
      >
        <Container
          maxWidth={false}
          sx={{ height: "100%", position: "relative", zIndex: 1 }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              color: "white",
              textAlign: { xs: "center", md: "left" },
              maxWidth: { xs: "100%", sm: "80%", md: "60%", lg: "50%" },
              px: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: { xs: 1, sm: 2 },
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: "3rem",
                  lg: "3.5rem",
                },
              }}
            >
              Find Your Perfect Stay
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: { xs: 3, sm: 4 },
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              Discover amazing places at exclusive deals
            </Typography>

            {/* Search Box */}
            <Paper
              component="form"
              onSubmit={handleSearch}
              elevation={3}
              sx={{
                p: { xs: "6px 12px", sm: "8px 16px" },
                display: "flex",
                alignItems: "center",
                borderRadius: { xs: 4, sm: 8 },
                backgroundColor: alpha("#fff", 0.95),
                backdropFilter: "blur(4px)",
                maxWidth: { xs: "100%", md: "600px" },
                mx: { xs: "auto", md: 0 },
                flexDirection: { xs: isSmall ? "column" : "row", sm: "row" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  width: isSmall ? "100%" : "auto",
                  mb: isSmall ? 1 : 0,
                  borderBottom: isSmall
                    ? `1px solid ${alpha(theme.palette.divider, 0.5)}`
                    : "none",
                  pb: isSmall ? 1 : 0,
                  cursor: "pointer",
                }}
                onClick={handleLocationClick}
              >
                <LocationOn sx={{ color: "primary.main", mr: 1 }} />
                <InputBase
                  sx={{ flex: 1, color: "text.primary" }}
                  placeholder="Where are you going?"
                  value={locationQuery || searchQuery}
                  onChange={(e) => {
                    setLocationQuery(e.target.value);
                    setSearchQuery(e.target.value);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLocationClick(e);
                  }}
                />
              </Box>

              <Popover
                open={openLocation}
                anchorEl={locationAnchorEl}
                onClose={handleLocationClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Box sx={{ p: 2, width: 300 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Popular Destinations
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: 300,
                      overflow: "auto",
                    }}
                  >
                    {availableLocations
                      .filter(
                        (location) =>
                          !locationQuery ||
                          location
                            .toLowerCase()
                            .includes(locationQuery.toLowerCase())
                      )
                      .map((location) => (
                        <Box
                          key={location}
                          sx={{
                            p: 1,
                            cursor: "pointer",
                            "&:hover": {
                              bgcolor: "rgba(0, 0, 0, 0.04)",
                            },
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => handleLocationSelect(location)}
                        >
                          <LocationOn
                            fontSize="small"
                            sx={{ mr: 1, color: "text.secondary" }}
                          />
                          <Typography variant="body2">{location}</Typography>
                        </Box>
                      ))}
                  </Box>
                </Box>
              </Popover>

              {!isSmall && (
                <Divider sx={{ height: 28, mx: 2 }} orientation="vertical" />
              )}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: isSmall ? "100%" : "auto",
                  justifyContent: isSmall ? "space-between" : "flex-start",
                  mt: isSmall ? 1 : 0,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleCalendarClick}
                >
                  <CalendarMonth sx={{ color: "primary.main", mr: 1 }} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    {checkInDate && checkOutDate
                      ? `${checkInDate.toLocaleDateString()} - ${checkOutDate.toLocaleDateString()}`
                      : "Select Dates"}
                  </Typography>
                </Box>

                <Popover
                  open={openCalendar}
                  anchorEl={calendarAnchorEl}
                  onClose={handleCalendarClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Box sx={{ p: 2 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                        }}
                      >
                        <DatePicker
                          label="Check-in"
                          value={checkInDate}
                          onChange={(newValue) => {
                            setCheckInDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          minDate={new Date()}
                        />
                        <DatePicker
                          label="Check-out"
                          value={checkOutDate}
                          onChange={(newValue) => {
                            setCheckOutDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          minDate={checkInDate || new Date()}
                        />
                        <Button
                          variant="contained"
                          onClick={handleCalendarClose}
                          fullWidth
                        >
                          Apply
                        </Button>
                      </Box>
                    </LocalizationProvider>
                  </Box>
                </Popover>

                {!isSmall && (
                  <Divider sx={{ height: 28, mx: 2 }} orientation="vertical" />
                )}

                <Box
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleGuestClick}
                >
                  <Person sx={{ color: "primary.main", mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                  </Typography>
                </Box>

                <Popover
                  open={openGuestMenu}
                  anchorEl={guestAnchorEl}
                  onClose={handleGuestClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <Box sx={{ p: 2, width: 250 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      Guests
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography>Adults</Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          size="small"
                          onClick={handleGuestDecrement}
                          disabled={guestCount <= 1}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{guestCount}</Typography>
                        <IconButton
                          size="small"
                          onClick={handleGuestIncrement}
                          disabled={guestCount >= 10}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Button
                      variant="contained"
                      onClick={handleGuestClose}
                      fullWidth
                    >
                      Apply
                    </Button>
                  </Box>
                </Popover>

                <IconButton
                  type="submit"
                  sx={{
                    p: { xs: "8px", sm: "10px" },
                    ml: { xs: 0, sm: 1 },
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth={false} sx={{ mt: { xs: 2, sm: 4 } }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: { xs: 2, sm: 4 },
            "& .MuiTab-root": {
              minWidth: "auto",
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.75, sm: 1 },
              mr: { xs: 0.5, sm: 1 },
              borderRadius: 2,
              textTransform: "none",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              fontWeight: 500,
              color: "text.primary",
              "&.Mui-selected": {
                color: "primary.main",
                bgcolor: alpha(theme.palette.primary.main, 0.1),
              },
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
        >
          {categories.map((category) => (
            <Tab
              key={category.id}
              value={category.id}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {category.icon && (
                    <Box sx={{ mr: { xs: 0.5, sm: 1 }, display: "flex" }}>
                      {React.cloneElement(category.icon, {
                        fontSize: isSmall ? "small" : "medium",
                      })}
                    </Box>
                  )}
                  {category.label}
                </Box>
              }
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </Tabs>

        {/* Featured Properties */}
        <Box sx={{ mb: { xs: 4, sm: 8 } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: { xs: 2, sm: 4 },
              fontWeight: 600,
              color: "primary.main",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
            }}
          >
            {selectedCategory === "all"
              ? "Featured Properties"
              : `${
                  categories.find((c) => c.id === selectedCategory)?.label || ""
                } Properties`}
          </Typography>
          <PropertyGrid properties={filteredProperties} loading={loading} />
        </Box>

        {/* Featured Destinations */}
        <Box sx={{ mb: { xs: 4, sm: 8 } }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: { xs: 2, sm: 4 },
              fontWeight: 600,
              color: "primary.main",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
            }}
          >
            Featured Destinations
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {destinations.map((destination) => (
              <Grid item xs={12} sm={6} md={3} key={destination.name}>
                <Card
                  sx={{
                    borderRadius: { xs: 3, sm: 4 },
                    overflow: "hidden",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                    cursor: "pointer",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                    },
                  }}
                  onClick={() =>
                    navigate(
                      `/hotels?location=${encodeURIComponent(destination.name)}`
                    )
                  }
                >
                  <CardMedia
                    component="img"
                    height={{ xs: 180, sm: 200, md: 240 }}
                    image={destination.image}
                    alt={destination.name}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
                    >
                      {destination.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
                    >
                      {destination.properties} properties
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Become a Host Banner */}
        <Box
          sx={{
            mb: { xs: 4, sm: 8 },
            p: { xs: 3, sm: 4, md: 6 },
            borderRadius: { xs: 3, sm: 4 },
            backgroundImage: "linear-gradient(to right, #FF385C, #FF5A5F)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              mb: { xs: 1, sm: 2 },
              fontWeight: 600,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
            }}
          >
            Become a Host
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: { xs: 3, sm: 4 },
              maxWidth: "800px",
              mx: "auto",
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            Earn extra income and unlock new opportunities by sharing your space
          </Typography>
          <Button
            variant="contained"
            size={isSmall ? "medium" : "large"}
            sx={{
              bgcolor: "white",
              color: "#FF385C",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
            onClick={() => navigate("/become-host")}
          >
            Learn More
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Home;
