import React, { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Rating,
  ImageList,
  ImageListItem,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  Avatar,
  Stack,
  Card,
  CardMedia,
  CardContent,
  LinearProgress,
  Container,
  Menu,
  MenuItem,
  Select,
  FormControl,
  Link,
} from "@mui/material";
import {
  Pool,
  Spa,
  Restaurant,
  FitnessCenter,
  BeachAccess,
  Landscape,
  LocationOn,
  Star,
  Wifi,
  LocalParking,
  AcUnit,
  Room,
  Share,
  FavoriteBorder,
  Favorite,
  IosShare,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Close,
  Person,
  Verified,
  SupervisorAccount,
  Map,
  Instagram,
  Facebook,
  Twitter,
  Pinterest,
} from "@mui/icons-material";
import { getPropertyById } from "../data/properties";

const amenityIcons = {
  wifi: <Wifi sx={{ color: "booking.main" }} />,
  pool: <Pool sx={{ color: "booking.main" }} />,
  spa: <Spa sx={{ color: "booking.main" }} />,
  gym: <FitnessCenter sx={{ color: "booking.main" }} />,
  restaurant: <Restaurant sx={{ color: "booking.main" }} />,
  beachAccess: <BeachAccess sx={{ color: "booking.main" }} />,
  mountainView: <Landscape sx={{ color: "booking.main" }} />,
  parking: <LocalParking sx={{ color: "booking.main" }} />,
  roomService: <Room sx={{ color: "booking.main" }} />,
  airConditioning: <AcUnit sx={{ color: "booking.main" }} />,
};

// Mock reviews data
const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    date: "August 2023",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    comment:
      "This place was absolutely stunning! The views were incredible and the amenities were top-notch. The host was very responsive and provided great local recommendations. Would definitely stay here again!",
  },
  {
    id: 2,
    name: "Michael Chen",
    date: "July 2023",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    comment:
      "Beautiful property with amazing views. The location was perfect - close to restaurants and attractions. The only minor issue was that the WiFi was a bit slow at times, but overall a great stay.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    date: "June 2023",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    rating: 5,
    comment:
      "We had a wonderful time at this property. The rooms were spacious and clean, and the pool was fantastic. The host was very accommodating and made sure we had everything we needed.",
  },
  {
    id: 4,
    name: "David Wilson",
    date: "May 2023",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 5,
    comment:
      "Exceptional service and beautiful accommodations. The property exceeded our expectations in every way. The attention to detail was impressive, and we felt very well taken care of during our stay.",
  },
  {
    id: 5,
    name: "Sophia Kim",
    date: "April 2023",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    rating: 4,
    comment:
      "Lovely place with great amenities. The location was perfect for exploring the area. The kitchen was well-equipped, and we enjoyed cooking meals during our stay. Would recommend!",
  },
  {
    id: 6,
    name: "James Thompson",
    date: "March 2023",
    avatar: "https://randomuser.me/api/portraits/men/64.jpg",
    rating: 5,
    comment:
      "One of the best places we've stayed! The property was immaculate and the views were breathtaking. The host provided excellent recommendations for local activities and restaurants.",
  },
];

// Mock similar properties data
const similarProperties = [
  {
    id: "similar1",
    name: "Luxury Beachfront Villa",
    location: "Bali, Indonesia",
    price: 320,
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "similar2",
    name: "Mountain Retreat Cabin",
    location: "Aspen, Colorado",
    price: 275,
    rating: 4.8,
    reviews: 94,
    image:
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "similar3",
    name: "Modern City Apartment",
    location: "Barcelona, Spain",
    price: 180,
    rating: 4.7,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: "similar4",
    name: "Seaside Cottage",
    location: "Santorini, Greece",
    price: 295,
    rating: 4.9,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

// Temporary function to replace i18n t function
const t = (key) => {
  // Extract the last part of the key after the dot
  const parts = key.split(".");
  const lastPart = parts[parts.length - 1];

  // Convert camelCase to Title Case with spaces
  return lastPart
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const checkInDate = searchParams.get("checkIn") || null;
  const checkOutDate = searchParams.get("checkOut") || null;
  const guestCount = searchParams.get("guests")
    ? parseInt(searchParams.get("guests"), 10)
    : 1;

  // Get hotel data based on id
  const hotel = getPropertyById(id);

  if (!hotel) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <Typography variant="h5" color="error">
          Property not found
        </Typography>
      </Box>
    );
  }

  const handleBooking = () => {
    navigate(`/booking/${hotel.id}`);
  };

  const handleGalleryOpen = () => {
    setGalleryOpen(true);
  };

  const handleGalleryClose = () => {
    setGalleryOpen(false);
  };

  const handleShareClick = () => {
    // Implement share functionality
    console.log("Share clicked");
  };

  const _toggleWishlist = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShowAllPhotos = () => {
    // Implement the logic to show all photos
    handleGalleryOpen();
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleShowAllReviews = () => {
    // Implement the logic to show all reviews
  };

  return (
    <Box sx={{ bgcolor: "background.default" }}>
      {/* Header */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          zIndex: 1100,
          py: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            mx: "auto",
            px: { xs: 2, sm: 4, md: 6, lg: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: "600", color: "primary.main" }}
            >
              {hotel.name}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Star sx={{ fontSize: 18, mr: 0.5, color: "booking.main" }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "500", color: "booking.dark" }}
                >
                  {hotel.rating}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                  fontWeight: "500",
                  color: "text.primary",
                }}
              >
                {hotel.reviews} reviews
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                  fontWeight: "500",
                  color: "text.primary",
                }}
              >
                {hotel.location.city}, {hotel.location.country}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton
                aria-label="share"
                onClick={handleShareClick}
                sx={{ color: "text.secondary" }}
              >
                <Share />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Share
                </Typography>
              </IconButton>
              <IconButton
                aria-label="save"
                onClick={_toggleWishlist}
                sx={{ color: isFavorite ? "error.main" : "text.secondary" }}
              >
                {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Save
                </Typography>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Photo Grid */}
      <Box
        sx={{
          maxWidth: "100%",
          mx: "auto",
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
          py: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(2, 200px)",
            gap: 1,
            borderRadius: 3,
            overflow: "hidden",
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.02)",
              },
            },
          }}
        >
          <Box
            sx={{
              gridColumn: "1 / 3",
              gridRow: "1 / 3",
              position: "relative",
            }}
            onClick={handleGalleryOpen}
          >
            <img src={hotel.images[0]} alt={hotel.name} />
          </Box>
          {hotel.images.slice(1, 5).map((image, index) => (
            <Box
              key={index}
              onClick={handleGalleryOpen}
              sx={{
                position: "relative",
                "&:last-child": {
                  borderTopRightRadius: 12,
                },
              }}
            >
              <img src={image} alt={`${hotel.name} ${index + 1}`} />
            </Box>
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={handleShowAllPhotos}
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              backgroundColor: "white",
            }}
          >
            Show all photos
          </Button>
        </Box>

        {/* Main Content */}
        <Grid container spacing={12} sx={{ mt: 2 }}>
          {/* Left Column */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{ borderBottom: "1px solid", borderColor: "divider", pb: 6 }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {hotel.type.charAt(0).toUpperCase() + hotel.type.slice(1)}{" "}
                    hosted by {hotel.host ? hotel.host.name : "Host"}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    gutterBottom
                  >
                    8 guests · 4 bedrooms · 6 beds · 3 baths
                  </Typography>
                </Box>
                <Avatar sx={{ width: 56, height: 56, bgcolor: "booking.main" }}>
                  <Person />
                </Avatar>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SupervisorAccount sx={{ color: "booking.main" }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "600", color: "booking.dark" }}
                    >
                      Superhost
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      Experienced, highly rated host committed to providing
                      great stays
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn sx={{ color: "booking.main" }} />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "600", color: "booking.dark" }}
                    >
                      Great Location
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      95% of recent guests rated the location 5-star
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{ py: 6, borderBottom: "1px solid", borderColor: "divider" }}
            >
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-line",
                  mb: 4,
                  fontSize: "1.05rem",
                  color: "text.primary",
                  lineHeight: 1.6,
                }}
              >
                {hotel.description}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                sx={{ cursor: "pointer", mt: 1 }}
              >
                Show more →
              </Typography>
            </Box>

            <Box
              sx={{ py: 6, borderBottom: "1px solid", borderColor: "divider" }}
            >
              <Typography
                variant="h5"
                sx={{ fontWeight: "600", mb: 4, color: "booking.dark" }}
              >
                What this place offers
              </Typography>
              <Grid container spacing={2}>
                {hotel.amenities.map((amenity) => (
                  <Grid item xs={12} sm={6} key={amenity}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        py: 1,
                        "&:hover": {
                          bgcolor: "rgba(74, 144, 226, 0.04)",
                          borderRadius: 1,
                        },
                      }}
                    >
                      {amenityIcons[amenity]}
                      <Typography
                        sx={{ fontWeight: "500", color: "text.primary" }}
                      >
                        {t(`amenities.${amenity}`)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="outlined"
                color="booking"
                sx={{ mt: 4, textTransform: "none", fontWeight: "500" }}
              >
                {t("common.showAllAmenities")}
              </Button>
            </Box>
          </Grid>

          {/* Right Column - Booking Card */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={2}
              sx={{
                p: 4,
                position: "sticky",
                top: 100,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "booking.light",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                bgcolor: "background.paper",
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                  <Typography
                    variant="h4"
                    component="span"
                    sx={{ fontWeight: "700", color: "booking.dark" }}
                  >
                    ${hotel.price.base}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "text.primary" }}>
                    {t("common.perNight")}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
                >
                  <Star sx={{ fontSize: 14, color: "booking.main" }} />
                  <Typography variant="body2">
                    <strong>{hotel.rating}</strong> · {hotel.reviews}{" "}
                    {t("common.reviews")}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        p: 2,
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "500" }}
                      >
                        {t("common.dates")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.primary" }}
                      >
                        {checkInDate && checkOutDate
                          ? `${new Date(
                              checkInDate
                            ).toLocaleDateString()} - ${new Date(
                              checkOutDate
                            ).toLocaleDateString()}`
                          : t("common.addDates")}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "500" }}
                      >
                        {t("common.guests")}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.primary" }}
                      >
                        {guestCount}{" "}
                        {guestCount === 1
                          ? t("common.guest")
                          : t("common.guests")}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                onClick={handleBooking}
                sx={{ py: 1.5, fontWeight: "600", fontSize: "1rem" }}
              >
                {t("common.reserve")}
              </Button>

              <Typography
                variant="body2"
                align="center"
                sx={{ mt: 2, color: "text.secondary" }}
              >
                {t("common.noCharge")}
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "underline", color: "text.primary" }}
                  >
                    ${hotel.price.base} x{" "}
                    {checkInDate && checkOutDate
                      ? Math.ceil(
                          (new Date(checkOutDate) - new Date(checkInDate)) /
                            (1000 * 60 * 60 * 24)
                        )
                      : 5}{" "}
                    {t("common.nights")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    $
                    {hotel.price.base *
                      (checkInDate && checkOutDate
                        ? Math.ceil(
                            (new Date(checkOutDate) - new Date(checkInDate)) /
                              (1000 * 60 * 60 * 24)
                          )
                        : 5)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "underline", color: "text.primary" }}
                  >
                    {t("common.cleaningFee")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    $100
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "underline", color: "text.primary" }}
                  >
                    {t("common.serviceFee")}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    $80
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "600",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.primary" }}
                  >
                    {t("common.total")}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.primary" }}
                  >
                    $
                    {hotel.price.base *
                      (checkInDate && checkOutDate
                        ? Math.ceil(
                            (new Date(checkOutDate) - new Date(checkInDate)) /
                              (1000 * 60 * 60 * 24)
                          )
                        : 5) +
                      180}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box sx={{ mt: 8, mb: 8 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Star sx={{ mr: 1, color: "booking.main" }} />
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: "600", mr: 1, color: "booking.dark" }}
            >
              {hotel.rating}
            </Typography>
            <Typography variant="h4" component="span" sx={{ mr: 1 }}>
              ·
            </Typography>
            <Typography variant="h4" component="h2" sx={{ fontWeight: "500" }}>
              {hotel.reviews} {t("common.reviews")}
            </Typography>
          </Box>

          {/* Rating Breakdown */}
          <Grid container spacing={4} sx={{ mb: 6 }}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "text.primary", fontWeight: "500" }}
                    >
                      {t("common.cleanliness")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={95}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          width: "80%",
                          mr: 1,
                          bgcolor: "rgba(74, 144, 226, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "booking.main",
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: "600" }}>
                        4.8
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "text.primary", fontWeight: "500" }}
                    >
                      {t("common.accuracy")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          width: "80%",
                          mr: 1,
                          bgcolor: "rgba(74, 144, 226, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "booking.main",
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: "600" }}>
                        5.0
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "text.primary", fontWeight: "500" }}
                    >
                      {t("common.communication")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={90}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          width: "80%",
                          mr: 1,
                          bgcolor: "rgba(74, 144, 226, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "booking.main",
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: "600" }}>
                        4.5
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "text.primary", fontWeight: "500" }}
                    >
                      {t("common.location")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={98}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          width: "80%",
                          mr: 1,
                          bgcolor: "rgba(74, 144, 226, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "booking.main",
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: "600" }}>
                        4.9
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "text.primary", fontWeight: "500" }}
                    >
                      {t("common.checkIn")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={96}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          width: "80%",
                          mr: 1,
                          bgcolor: "rgba(74, 144, 226, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "booking.main",
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: "600" }}>
                        4.8
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ color: "text.primary", fontWeight: "500" }}
                    >
                      {t("common.value")}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                      }}
                    >
                      <LinearProgress
                        variant="determinate"
                        value={92}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          width: "80%",
                          mr: 1,
                          bgcolor: "rgba(74, 144, 226, 0.1)",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "booking.main",
                          },
                        }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: "600" }}>
                        4.6
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Reviews Grid */}
          <Grid container spacing={4}>
            {reviews.map((review) => (
              <Grid item xs={12} md={6} key={review.id}>
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", mb: 2 }}>
                    <Avatar
                      src={review.avatar}
                      alt={review.name}
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "600", color: "booking.dark" }}
                      >
                        {review.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.primary" }}
                      >
                        {review.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.6, color: "text.primary" }}
                >
                  {review.comment}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleShowAllReviews}
            sx={{ mt: 2 }}
          >
            Show all reviews ({hotel.reviews})
          </Button>
        </Box>

        {/* Location Section */}
        <Box sx={{ mt: 8, mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "600", mb: 4, color: "booking.dark" }}
          >
            {t("common.whereYouWillBe")}
          </Typography>

          <Box
            sx={{
              height: 480,
              width: "100%",
              bgcolor: "#e8f0e8",
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
              border: "1px solid",
              borderColor: "booking.light",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            {/* Map Background - Satellite View */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=1200x800&maptype=roadmap&style=feature:all|element:labels|visibility:on&style=feature:landscape|element:all|color:0xf2f2f2&style=feature:poi|element:all|visibility:off&style=feature:road|element:all|saturation:-100|lightness:45&style=feature:road.highway|element:all|visibility:simplified&style=feature:road.arterial|element:labels.icon|visibility:off&style=feature:transit|element:all|visibility:off&style=feature:water|element:all|color:0x46bcec|visibility:on&key=YOUR_API_KEY')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(1px)",
                  zIndex: 1,
                },
              }}
            />

            {/* Fallback Map Background */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 2,
                backgroundImage: `url('/map-background.jpg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.9,
              }}
            />

            {/* Map Grid Overlay */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 3,
                opacity: 0.7,
              }}
            >
              {/* Horizontal grid lines */}
              {[...Array(20)].map((_, i) => (
                <Box
                  key={`h-grid-${i}`}
                  sx={{
                    position: "absolute",
                    top: `${i * 5}%`,
                    left: 0,
                    width: "100%",
                    height: "1px",
                    bgcolor: "rgba(255,255,255,0.2)",
                  }}
                />
              ))}

              {/* Vertical grid lines */}
              {[...Array(20)].map((_, i) => (
                <Box
                  key={`v-grid-${i}`}
                  sx={{
                    position: "absolute",
                    left: `${i * 5}%`,
                    top: 0,
                    height: "100%",
                    width: "1px",
                    bgcolor: "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </Box>

            {/* Main Roads */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 4,
              }}
            >
              {/* Horizontal main roads */}
              <Box
                sx={{
                  position: "absolute",
                  top: "30%",
                  left: 0,
                  width: "100%",
                  height: "6px",
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: "60%",
                  left: 0,
                  width: "100%",
                  height: "4px",
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                  boxShadow: "0 0 8px rgba(0,0,0,0.2)",
                }}
              />

              {/* Vertical main roads */}
              <Box
                sx={{
                  position: "absolute",
                  left: "25%",
                  top: 0,
                  height: "100%",
                  width: "6px",
                  bgcolor: "rgba(255, 255, 255, 0.8)",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  left: "75%",
                  top: 0,
                  height: "100%",
                  width: "4px",
                  bgcolor: "rgba(255, 255, 255, 0.7)",
                  boxShadow: "0 0 8px rgba(0,0,0,0.2)",
                }}
              />
            </Box>

            {/* Secondary Roads */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 4,
              }}
            >
              {/* Horizontal secondary roads */}
              {[15, 45, 75].map((pos, i) => (
                <Box
                  key={`h-road-${i}`}
                  sx={{
                    position: "absolute",
                    top: `${pos}%`,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    bgcolor: "rgba(255, 255, 255, 0.6)",
                  }}
                />
              ))}

              {/* Vertical secondary roads */}
              {[10, 40, 60, 90].map((pos, i) => (
                <Box
                  key={`v-road-${i}`}
                  sx={{
                    position: "absolute",
                    left: `${pos}%`,
                    top: 0,
                    height: "100%",
                    width: "2px",
                    bgcolor: "rgba(255, 255, 255, 0.6)",
                  }}
                />
              ))}
            </Box>

            {/* City Blocks */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 5,
              }}
            >
              {/* Generate city blocks in a grid pattern */}
              {[...Array(5)].map((_, row) =>
                [...Array(5)].map((_, col) => (
                  <Box
                    key={`block-${row}-${col}`}
                    sx={{
                      position: "absolute",
                      top: `${row * 15 + 10}%`,
                      left: `${col * 15 + 10}%`,
                      width: "12%",
                      height: "12%",
                      bgcolor: "rgba(210, 210, 210, 0.6)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  />
                ))
              )}
            </Box>

            {/* Parks and Green Areas */}
            <Box
              sx={{
                position: "absolute",
                top: "65%",
                left: "15%",
                width: "20%",
                height: "25%",
                bgcolor: "rgba(76, 175, 80, 0.4)",
                borderRadius: "50%",
                border: "1px solid rgba(76, 175, 80, 0.6)",
                zIndex: 5,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: "10%",
                right: "10%",
                width: "15%",
                height: "15%",
                bgcolor: "rgba(76, 175, 80, 0.4)",
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                border: "1px solid rgba(76, 175, 80, 0.6)",
                zIndex: 5,
              }}
            />

            {/* Water Body */}
            <Box
              sx={{
                position: "absolute",
                bottom: "5%",
                right: "15%",
                width: "30%",
                height: "20%",
                bgcolor: "rgba(33, 150, 243, 0.4)",
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                border: "1px solid rgba(33, 150, 243, 0.6)",
                zIndex: 5,
              }}
            />

            {/* Location marker with animation */}
            <Box
              sx={{
                position: "absolute",
                top: "48%",
                left: "48%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            >
              {/* Outer ripple effect */}
              <Box
                sx={{
                  position: "absolute",
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  bgcolor: "rgba(255, 56, 92, 0.1)",
                  animation: "ripple 2s infinite ease-out",
                  "@keyframes ripple": {
                    "0%": {
                      transform: "scale(0.5)",
                      opacity: 1,
                    },
                    "100%": {
                      transform: "scale(2.5)",
                      opacity: 0,
                    },
                  },
                }}
              />

              {/* Middle ripple effect */}
              <Box
                sx={{
                  position: "absolute",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  bgcolor: "rgba(255, 56, 92, 0.2)",
                  animation: "ripple 2s infinite ease-out 0.3s",
                  "@keyframes ripple": {
                    "0%": {
                      transform: "scale(0.5)",
                      opacity: 1,
                    },
                    "100%": {
                      transform: "scale(2)",
                      opacity: 0,
                    },
                  },
                }}
              />

              {/* Inner ripple effect */}
              <Box
                sx={{
                  position: "absolute",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  bgcolor: "rgba(255, 56, 92, 0.3)",
                  animation: "ripple 2s infinite ease-out 0.6s",
                  "@keyframes ripple": {
                    "0%": {
                      transform: "scale(0.5)",
                      opacity: 1,
                    },
                    "100%": {
                      transform: "scale(1.5)",
                      opacity: 0,
                    },
                  },
                }}
              />

              {/* Center marker */}
              <Box
                sx={{
                  position: "relative",
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  border: "3px solid white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                  zIndex: 11,
                }}
              />
            </Box>

            {/* Location labels */}
            <Box
              sx={{
                position: "absolute",
                top: "15%",
                right: "15%",
                transform: "translate(0, -50%)",
                bgcolor: "background.paper",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                zIndex: 10,
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "text.primary",
              }}
            >
              Central Park
            </Box>

            <Box
              sx={{
                position: "absolute",
                top: "65%",
                left: "15%",
                transform: "translate(0, -50%)",
                bgcolor: "background.paper",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                zIndex: 10,
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "text.primary",
              }}
            >
              City Park
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: "15%",
                right: "25%",
                transform: "translate(0, 0)",
                bgcolor: "background.paper",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                zIndex: 10,
                fontSize: "0.75rem",
                fontWeight: "600",
                color: "text.primary",
              }}
            >
              Lake View
            </Box>

            {/* Compass Rose */}
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                right: 20,
                width: 60,
                height: 60,
                bgcolor: "background.paper",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                zIndex: 10,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  position: "relative",
                }}
              >
                {/* North */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "primary.main",
                  }}
                >
                  N
                </Box>
                {/* East */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "text.primary",
                  }}
                >
                  E
                </Box>
                {/* South */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "text.primary",
                  }}
                >
                  S
                </Box>
                {/* West */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    transform: "translateY(-50%)",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    color: "text.primary",
                  }}
                >
                  W
                </Box>
                {/* Compass lines */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: "100%",
                    height: "1px",
                    bgcolor: "divider",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    width: "1px",
                    height: "100%",
                    bgcolor: "divider",
                  }}
                />
              </Box>
            </Box>

            {/* Hotel location info */}
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                zIndex: 20,
                bgcolor: "background.paper",
                p: 2,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                maxWidth: 300,
                border: "1px solid",
                borderColor: "booking.light",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
              >
                <LocationOn sx={{ color: "primary.main" }} />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", color: "booking.dark" }}
                >
                  {hotel.name}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "text.primary", mb: 1 }}>
                {hotel.location.city}, {hotel.location.country}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Star sx={{ fontSize: 14, color: "booking.main" }} />
                <Typography variant="body2" sx={{ fontWeight: "500" }}>
                  {hotel.rating} · {t("common.greatLocation")}
                </Typography>
              </Box>
            </Box>

            {/* Map controls */}
            <Box
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                zIndex: 20,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  minWidth: "auto",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  p: 0,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                +
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  minWidth: "auto",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  p: 0,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                -
              </Button>
            </Box>

            {/* Map Type Selector */}
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                zIndex: 20,
                bgcolor: "background.paper",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                overflow: "hidden",
              }}
            >
              <Button
                variant="contained"
                disableElevation
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: 0,
                  px: 2,
                  py: 1,
                  fontSize: "0.75rem",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                Map
              </Button>
              <Button
                variant="text"
                sx={{
                  color: "text.primary",
                  borderRadius: 0,
                  px: 2,
                  py: 1,
                  fontSize: "0.75rem",
                }}
              >
                Satellite
              </Button>
            </Box>

            {/* Scale Bar */}
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  bgcolor: "background.paper",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    height: "4px",
                    width: "50px",
                    bgcolor: "text.primary",
                    mr: 0.5,
                  }}
                />
                <Typography variant="caption" sx={{ fontWeight: "500" }}>
                  500 m
                </Typography>
              </Box>
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{ mb: 3, color: "text.primary", lineHeight: 1.6 }}
          >
            {t("common.locationDescription")}
          </Typography>

          <Button
            variant="text"
            sx={{
              textTransform: "none",
              fontWeight: "500",
              color: "booking.main",
            }}
          >
            {t("common.showMore")} →
          </Button>
        </Box>

        {/* Similar Properties Section */}
        <Box sx={{ mt: 8, mb: 12 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "600", mb: 4, color: "booking.dark" }}
          >
            {t("common.morePlacesToStay")}
          </Typography>

          <Grid container spacing={3}>
            {similarProperties.map((property) => (
              <Grid item xs={12} sm={6} md={3} key={property.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    boxShadow: "none",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 3,
                      transition: "box-shadow 0.3s ease-in-out",
                    },
                  }}
                  onClick={() => navigate(`/hotel/${property.id}`)}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={property.image}
                      alt={property.name}
                      sx={{ borderRadius: 3 }}
                    />
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        color: "white",
                        bgcolor: "rgba(0,0,0,0.3)",
                        "&:hover": {
                          bgcolor: "rgba(0,0,0,0.5)",
                        },
                      }}
                    >
                      <FavoriteBorder />
                    </IconButton>
                  </Box>
                  <CardContent sx={{ px: 1, pt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: "600", color: "booking.dark" }}
                      >
                        {property.location}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Star
                          sx={{ fontSize: 16, mr: 0.5, color: "booking.main" }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: "600" }}>
                          {property.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, color: "text.primary", fontWeight: "500" }}
                    >
                      {property.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {t("common.nightsAvailable")}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "700", color: "primary.main" }}
                    >
                      <strong>${property.price}</strong> {t("common.perNight")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", mb: 2, color: "booking.dark" }}
              >
                {t("common.support")}
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.helpCenter")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.safetyInformation")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.cancellationOptions")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.supportDisabilities")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.reportNeighborhoodConcern")}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", mb: 2, color: "booking.dark" }}
              >
                {t("common.community")}
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.disasterReliefHousing")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.combatingDiscrimination")}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", mb: 2, color: "booking.dark" }}
              >
                {t("common.hosting")}
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.tryHosting")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.airCover")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.exploreHostingResources")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.visitCommunityForum")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.howToHostResponsibly")}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", mb: 2, color: "booking.dark" }}
              >
                {t("common.about")}
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.newsroom")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.learnAboutFeatures")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.careers")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.investors")}
                </Typography>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                © 2023 Hotel Booking, Inc.
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.privacy")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.terms")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "text.primary",
                    "&:hover": {
                      textDecoration: "underline",
                      color: "booking.main",
                    },
                  }}
                >
                  {t("common.sitemap")}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
              <IconButton size="small" sx={{ color: "booking.main" }}>
                <Instagram />
              </IconButton>
              <IconButton size="small" sx={{ color: "booking.main" }}>
                <Facebook />
              </IconButton>
              <IconButton size="small" sx={{ color: "booking.main" }}>
                <Twitter />
              </IconButton>
              <IconButton size="small" sx={{ color: "booking.main" }}>
                <Pinterest />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Gallery Dialog */}
      <Dialog fullScreen open={galleryOpen} onClose={handleGalleryClose}>
        <Box
          sx={{
            height: "100vh",
            bgcolor: "common.white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            <IconButton
              onClick={handleGalleryClose}
              sx={{ mr: 2, color: "booking.dark" }}
            >
              <Close />
            </IconButton>
            <Typography sx={{ color: "text.primary", fontWeight: "500" }}>
              {currentImageIndex + 1} / {hotel.images.length}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              px: 8,
            }}
          >
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: "absolute",
                left: 16,
                bgcolor: "background.paper",
                color: "booking.dark",
                "&:hover": { bgcolor: "background.paper" },
              }}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <img
              src={hotel.images[currentImageIndex]}
              alt={hotel.name}
              style={{
                maxWidth: "100%",
                maxHeight: "calc(100vh - 100px)",
                objectFit: "contain",
              }}
            />
            <IconButton
              onClick={handleNextImage}
              sx={{
                position: "absolute",
                right: 16,
                bgcolor: "background.paper",
                color: "booking.dark",
                "&:hover": { bgcolor: "background.paper" },
              }}
            >
              <KeyboardArrowRight />
            </IconButton>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default HotelDetail;
