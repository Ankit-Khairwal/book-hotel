import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Rating,
  CardMedia,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { properties } from "../data/properties";
import Footer from "../components/Footer";

// Use the properties data from our data file instead of mock data
function Hotels() {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [loading, setLoading] = useState(true);

  const amenitiesList = [
    "Pool",
    "Spa",
    "Beach Access",
    "Restaurant",
    "Fitness Center",
    "Wifi",
  ];

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    filterHotels(newValue, selectedAmenities);
  };

  const handleAmenityChange = (amenity) => {
    const newSelectedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];
    setSelectedAmenities(newSelectedAmenities);
    filterHotels(priceRange, newSelectedAmenities);
  };

  const filterHotels = (price, amenities) => {
    // Get the search query and location from URL parameters
    const searchQuery = searchParams.get("search")?.toLowerCase();
    const locationQuery = searchParams.get("location")?.toLowerCase();

    let filtered = properties.filter((hotel) => {
      // Price filter
      const priceMatch =
        hotel.price.base >= price[0] && hotel.price.base <= price[1];

      // Amenities filter
      const amenitiesMatch =
        amenities.length === 0 ||
        amenities.every((a) => hotel.amenities.includes(a.toLowerCase()));

      // Search query filter
      const searchMatch =
        !searchQuery ||
        hotel.name.toLowerCase().includes(searchQuery) ||
        hotel.location.city.toLowerCase().includes(searchQuery) ||
        hotel.location.country.toLowerCase().includes(searchQuery) ||
        hotel.description.toLowerCase().includes(searchQuery);

      // Location filter
      const locationMatch =
        !locationQuery ||
        hotel.location.city.toLowerCase().includes(locationQuery) ||
        hotel.location.country.toLowerCase().includes(locationQuery);

      return priceMatch && amenitiesMatch && searchMatch && locationMatch;
    });

    setHotels(filtered);
  };

  useEffect(() => {
    setLoading(true);

    // Initialize with all properties
    const initialHotels = [...properties];

    // Set initial price range based on min and max prices in data
    const prices = properties.map((p) => p.price.base);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    setPriceRange([minPrice, maxPrice]);

    // Apply filters based on URL parameters
    const searchQuery = searchParams.get("search");
    const locationQuery = searchParams.get("location");

    if (searchQuery || locationQuery) {
      filterHotels([minPrice, maxPrice], []);
    } else {
      setHotels(initialHotels);
    }

    setLoading(false);
  }, [searchParams]);

  return (
    <>
      <Container maxWidth={false} sx={{ py: 4 }}>
        {/* Search results header */}
        {searchParams.get("location") && (
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Hotels in {searchParams.get("location")}
          </Typography>
        )}

        {searchParams.get("search") && (
          <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
            Search results for "{searchParams.get("search")}"
          </Typography>
        )}

        <Grid container spacing={3}>
          {/* Filters */}
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography gutterBottom>Price Range</Typography>
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={2000}
                  sx={{ mt: 2 }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">${priceRange[0]}</Typography>
                  <Typography variant="body2">${priceRange[1]}</Typography>
                </Box>
              </Box>

              <Box>
                <Typography gutterBottom>Amenities</Typography>
                <FormGroup>
                  {amenitiesList.map((amenity) => (
                    <FormControlLabel
                      key={amenity}
                      control={
                        <Checkbox
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => handleAmenityChange(amenity)}
                        />
                      }
                      label={amenity}
                    />
                  ))}
                </FormGroup>
              </Box>
            </Paper>
          </Grid>

          {/* Hotel Listings */}
          <Grid item xs={12} md={9}>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <Typography>Loading...</Typography>
              </Box>
            ) : hotels.length === 0 ? (
              <Alert severity="info" sx={{ mb: 3 }}>
                No hotels found matching your criteria. Try adjusting your
                filters.
              </Alert>
            ) : (
              <Grid container spacing={3}>
                {hotels.map((hotel) => (
                  <Grid item key={hotel.id} xs={12} sm={6} lg={4}>
                    <Link
                      to={`/hotels/${hotel.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card
                        sx={{
                          height: "100%",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={hotel.images[0]}
                          alt={hotel.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {hotel.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {hotel.location.city}, {hotel.location.country}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1,
                            }}
                          >
                            <Rating
                              value={hotel.rating}
                              precision={0.1}
                              readOnly
                              size="small"
                            />
                            <Typography variant="body2" color="text.secondary">
                              ({hotel.reviews})
                            </Typography>
                          </Box>
                          <Typography variant="h6" color="primary">
                            ${hotel.price.base}{" "}
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              / night
                            </Typography>
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Hotels;
