import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  Language,
} from "@mui/icons-material";
import { getPropertyById } from "../data/properties";
import LanguageSelector from "../components/LanguageSelector";

const amenityIcons = {
  wifi: <Wifi />,
  pool: <Pool />,
  spa: <Spa />,
  gym: <FitnessCenter />,
  restaurant: <Restaurant />,
  beachAccess: <BeachAccess />,
  mountainView: <Landscape />,
  parking: <LocalParking />,
  roomService: <Room />,
  airConditioning: <AcUnit />,
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

function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get hotel data based on id
  const hotel = getPropertyById(id);

  // Load saved language preference when component mounts
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage && i18n.language !== savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  if (!hotel) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" color="text.secondary">
          {t("common.notFound")}
        </Typography>
      </Box>
    );
  }

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  const handleGalleryOpen = () => {
    setIsGalleryOpen(true);
  };

  const handleGalleryClose = () => {
    setIsGalleryOpen(false);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
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
            maxWidth: "1760px",
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
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              {hotel.name}
            </Typography>
            <LanguageSelector />
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
                <Star sx={{ fontSize: 18, mr: 0.5 }} />
                <Typography variant="body2" sx={{ fontWeight: "500" }}>
                  {hotel.rating}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                  fontWeight: "500",
                }}
              >
                {hotel.reviews} {t("common.reviews")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "underline",
                  fontWeight: "500",
                }}
              >
                {hotel.location.city}, {hotel.location.country}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                startIcon={<Share />}
                sx={{ textTransform: "none", color: "text.primary" }}
              >
                {t("common.share")}
              </Button>
              <Button
                startIcon={
                  isFavorite ? <Favorite color="error" /> : <FavoriteBorder />
                }
                onClick={() => setIsFavorite(!isFavorite)}
                sx={{ textTransform: "none", color: "text.primary" }}
              >
                {t("common.save")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Photo Grid */}
      <Box
        sx={{
          maxWidth: "1760px",
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
            variant="contained"
            onClick={handleGalleryOpen}
            sx={{
              position: "absolute",
              right: 24,
              bottom: 24,
              bgcolor: "background.paper",
              color: "text.primary",
              textTransform: "none",
              "&:hover": {
                bgcolor: "background.paper",
              },
            }}
          >
            {t("common.showAllPhotos")}
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
                  <Typography variant="h4" sx={{ fontWeight: "500", mb: 1 }}>
                    {t(`propertyTypes.${hotel.type}`)} {t("common.hostedBy")}{" "}
                    John Doe
                  </Typography>
                  <Typography color="text.secondary">
                    8 {t("common.guests")} · 4 {t("common.bedrooms")} · 6{" "}
                    {t("common.beds")} · 3 {t("common.baths")}
                  </Typography>
                </Box>
                <Avatar sx={{ width: 56, height: 56 }}>
                  <Person />
                </Avatar>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <SupervisorAccount />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: "500" }}>
                      {t("common.superhost")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t("common.superhostDesc")}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: "500" }}>
                      {t("common.greatLocation")}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      95% {t("common.recentGuestsRated")}
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
                sx={{ whiteSpace: "pre-line", mb: 4 }}
              >
                {hotel.description}
              </Typography>
              <Button
                variant="text"
                sx={{ textTransform: "none", fontWeight: "500" }}
              >
                {t("common.showMore")} →
              </Button>
            </Box>

            <Box
              sx={{ py: 6, borderBottom: "1px solid", borderColor: "divider" }}
            >
              <Typography variant="h5" sx={{ fontWeight: "500", mb: 4 }}>
                {t("common.whatThisPlaceOffers")}
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
                      }}
                    >
                      {amenityIcons[amenity]}
                      <Typography>{t(`amenities.${amenity}`)}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="outlined"
                sx={{ mt: 4, textTransform: "none", fontWeight: "500" }}
              >
                {t("common.showAllAmenities")}
              </Button>
            </Box>
          </Grid>

          {/* Right Column - Booking Card */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={1}
              sx={{
                p: 4,
                position: "sticky",
                top: 100,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                  <Typography
                    variant="h4"
                    component="span"
                    sx={{ fontWeight: "600" }}
                  >
                    ${hotel.price.base}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {t("common.perNight")}
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}
                >
                  <Star sx={{ fontSize: 14 }} />
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
                      <Typography variant="body2" color="text.secondary">
                        {t("common.addDates")}
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
                      <Typography variant="body2" color="text.secondary">
                        1 {t("common.guest")}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleBooking}
                sx={{
                  bgcolor: "primary.main",
                  color: "common.white",
                  py: 1.5,
                  fontSize: "1rem",
                  textTransform: "none",
                  fontWeight: "500",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                {t("common.reserve")}
              </Button>

              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
                sx={{ mt: 2 }}
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
                    sx={{ textDecoration: "underline" }}
                  >
                    ${hotel.price.base} x 5 {t("common.nights")}
                  </Typography>
                  <Typography variant="body2">
                    ${hotel.price.base * 5}
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
                    sx={{ textDecoration: "underline" }}
                  >
                    {t("common.cleaningFee")}
                  </Typography>
                  <Typography variant="body2">$100</Typography>
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
                    sx={{ textDecoration: "underline" }}
                  >
                    {t("common.serviceFee")}
                  </Typography>
                  <Typography variant="body2">$80</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "600",
                  }}
                >
                  <Typography variant="subtitle2">
                    {t("common.total")}
                  </Typography>
                  <Typography variant="subtitle2">
                    ${hotel.price.base * 5 + 180}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Reviews Section */}
        <Box sx={{ mt: 8, mb: 8 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
            <Star sx={{ mr: 1 }} />
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: "500", mr: 1 }}
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
                    <Typography variant="body1">
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
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "text.primary",
                          },
                        }}
                      />
                      <Typography variant="body2">4.8</Typography>
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
                    <Typography variant="body1">
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
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "text.primary",
                          },
                        }}
                      />
                      <Typography variant="body2">5.0</Typography>
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
                    <Typography variant="body1">
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
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "text.primary",
                          },
                        }}
                      />
                      <Typography variant="body2">4.5</Typography>
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
                    <Typography variant="body1">
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
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "text.primary",
                          },
                        }}
                      />
                      <Typography variant="body2">4.9</Typography>
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
                    <Typography variant="body1">
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
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "text.primary",
                          },
                        }}
                      />
                      <Typography variant="body2">4.8</Typography>
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
                    <Typography variant="body1">{t("common.value")}</Typography>
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
                          bgcolor: "grey.200",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "text.primary",
                          },
                        }}
                      />
                      <Typography variant="body2">4.6</Typography>
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
                        sx={{ fontWeight: "500" }}
                      >
                        {review.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography variant="body1">{review.comment}</Typography>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="outlined"
            sx={{
              mt: 2,
              textTransform: "none",
              fontWeight: "500",
              borderColor: "text.primary",
              color: "text.primary",
            }}
          >
            {t("common.showAllReviews")} ({hotel.reviews})
          </Button>
        </Box>

        {/* Location Section */}
        <Box sx={{ mt: 8, mb: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "500", mb: 4 }}
          >
            {t("common.whereYouWillBe")}
          </Typography>

          <Box
            sx={{
              height: 480,
              width: "100%",
              bgcolor: "grey.200",
              borderRadius: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Map sx={{ fontSize: 60, color: "text.secondary" }} />
          </Box>

          <Typography variant="h5" sx={{ fontWeight: "500", mb: 1 }}>
            {hotel.location.city}, {hotel.location.country}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t("common.locationDescription")}
          </Typography>

          <Button
            variant="text"
            sx={{ textTransform: "none", fontWeight: "500" }}
          >
            {t("common.showMore")} →
          </Button>
        </Box>

        {/* Similar Properties Section */}
        <Box sx={{ mt: 8, mb: 12 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "500", mb: 4 }}
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
                        sx={{ fontWeight: "500" }}
                      >
                        {property.location}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Star sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="body2">
                          {property.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
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
                    <Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
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
              <Typography variant="h6" sx={{ fontWeight: "500", mb: 2 }}>
                {t("common.support")}
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.helpCenter")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.safetyInformation")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.cancellationOptions")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.supportDisabilities")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.reportNeighborhoodConcern")}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "500", mb: 2 }}>
                {t("common.community")}
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.disasterReliefHousing")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.combatingDiscrimination")}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "500", mb: 2 }}>
                {t("common.hosting")}
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.tryHosting")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.airCover")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.exploreHostingResources")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.visitCommunityForum")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.howToHostResponsibly")}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: "500", mb: 2 }}>
                {t("common.about")}
              </Typography>
              <Stack spacing={1}>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.newsroom")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.learnAboutFeatures")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.careers")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
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
              <Typography variant="body2" color="text.secondary">
                © 2023 Hotel Booking, Inc.
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.privacy")}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.terms")}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {t("common.sitemap")}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
              <IconButton size="small">
                <Instagram />
              </IconButton>
              <IconButton size="small">
                <Facebook />
              </IconButton>
              <IconButton size="small">
                <Twitter />
              </IconButton>
              <IconButton size="small">
                <Pinterest />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Gallery Dialog */}
      <Dialog fullScreen open={isGalleryOpen} onClose={handleGalleryClose}>
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
            <IconButton onClick={handleGalleryClose} sx={{ mr: 2 }}>
              <Close />
            </IconButton>
            <Typography>
              {selectedImage + 1} / {hotel.images.length}
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
                "&:hover": { bgcolor: "background.paper" },
              }}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <img
              src={hotel.images[selectedImage]}
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
