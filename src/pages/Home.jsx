import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
} from "@mui/icons-material";
import { properties, propertyTypes, amenities } from "../data/properties";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading featured properties
    setLoading(true);
    setTimeout(() => {
      const featured = properties
        .filter((property) => property.featured)
        .slice(0, 8);
      setFeaturedProperties(featured);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/hotels?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handlePropertyClick = (id) => {
    navigate(`/hotel/${id}`);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "70vh", md: "85vh" },
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
          maxWidth="xl"
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
              maxWidth: { xs: "100%", md: "50%" },
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                mb: 2,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {t("home.heroTitle")}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {t("home.heroSubtitle")}
            </Typography>

            {/* Search Box */}
            <Paper
              component="form"
              onSubmit={handleSearch}
              elevation={3}
              sx={{
                p: "8px 16px",
                display: "flex",
                alignItems: "center",
                borderRadius: 8,
                backgroundColor: alpha("#fff", 0.95),
                backdropFilter: "blur(4px)",
                maxWidth: { xs: "100%", md: "600px" },
                mx: { xs: "auto", md: 0 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
                <LocationOn sx={{ color: "primary.main", mr: 1 }} />
                <InputBase
                  sx={{ flex: 1, color: "text.primary" }}
                  placeholder={t("home.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Box>
              <Divider sx={{ height: 28, mx: 2 }} orientation="vertical" />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CalendarMonth sx={{ color: "primary.main", mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {t("home.anyWeek")}
                </Typography>
              </Box>
              <Divider sx={{ height: 28, mx: 2 }} orientation="vertical" />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Person sx={{ color: "primary.main", mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {t("home.addGuests")}
                </Typography>
              </Box>
              <IconButton
                type="submit"
                sx={{
                  p: "10px",
                  ml: 1,
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Categories */}
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            mb: 4,
            "& .MuiTab-root": {
              minWidth: "auto",
              px: 2,
              py: 1,
              mr: 1,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "0.9rem",
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
                  {category.icon && <Box sx={{ mr: 1 }}>{category.icon}</Box>}
                  {t(`categories.${category.id}`)}
                </Box>
              }
            />
          ))}
        </Tabs>

        {/* Featured Properties */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            {t("home.featuredProperties")}
          </Typography>
          <PropertyGrid properties={featuredProperties} loading={loading} />
        </Box>

        {/* Featured Destinations */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 4, fontWeight: 600 }}
          >
            {t("home.featuredDestinations")}
          </Typography>
          <Grid container spacing={3}>
            {destinations.map((destination) => (
              <Grid item xs={12} sm={6} md={3} key={destination.name}>
                <Card
                  sx={{
                    borderRadius: 4,
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
                    height="240"
                    image={destination.image}
                    alt={destination.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      {destination.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {destination.properties} {t("home.properties")}
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
            mb: 8,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundImage: "linear-gradient(to right, #FF385C, #FF5A5F)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            {t("home.becomeHostTitle")}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, maxWidth: "800px", mx: "auto" }}
          >
            {t("home.becomeHostDescription")}
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "#FF385C",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.9)",
              },
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
            onClick={() => navigate("/become-host")}
          >
            {t("home.learnMore")}
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}

export default Home;
