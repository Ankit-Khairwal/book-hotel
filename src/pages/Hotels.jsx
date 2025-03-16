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
} from "@mui/material";
import { Link } from "react-router-dom";

// Mock data - replace with actual API calls in production
const allHotels = [
  {
    id: 1,
    name: "Luxury Beach Resort",
    location: "Maldives",
    price: 299,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    amenities: ["Pool", "Spa", "Beach Access", "Restaurant"],
  },
  {
    id: 2,
    name: "Mountain View Lodge",
    location: "Swiss Alps",
    price: 199,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    amenities: ["Skiing", "Restaurant", "Fitness Center"],
  },
  // Add more hotels as needed
];

function Hotels() {
  const [searchParams] = useSearchParams();
  const [hotels, setHotels] = useState(allHotels);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenitiesList = [
    "Pool",
    "Spa",
    "Beach Access",
    "Restaurant",
    "Fitness Center",
    "Skiing",
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
    let filtered = allHotels.filter(
      (hotel) =>
        hotel.price >= price[0] &&
        hotel.price <= price[1] &&
        (amenities.length === 0 ||
          amenities.every((a) => hotel.amenities.includes(a)))
    );
    setHotels(filtered);
  };

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      const filtered = allHotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setHotels(filtered);
    }
  }, [searchParams]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
                max={1000}
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
                      image={hotel.image}
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
                        {hotel.location}
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
                          ({hotel.rating})
                        </Typography>
                      </Box>
                      <Typography variant="h6" color="primary">
                        ${hotel.price}{" "}
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hotels;
