import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
} from "@mui/material";
import {
  CalendarMonth,
  LocationOn,
  Star,
  ArrowForward,
  Cancel,
} from "@mui/icons-material";

// Mock data - Replace with actual API calls
const mockBookings = [
  {
    id: 1,
    hotelName: "Luxury Beach Resort",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    checkIn: "2024-05-15",
    checkOut: "2024-05-20",
    status: "upcoming",
    totalPrice: 1495,
    rating: null,
  },
  {
    id: 2,
    hotelName: "Mountain View Lodge",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    checkIn: "2024-03-10",
    checkOut: "2024-03-15",
    status: "completed",
    totalPrice: 1245,
    rating: 5,
  },
  {
    id: 3,
    hotelName: "City Center Hotel",
    location: "New York",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    checkIn: "2024-04-01",
    checkOut: "2024-04-05",
    status: "cancelled",
    totalPrice: 895,
    rating: null,
  },
];

function MyBookings() {
  const { user, loading: authLoading } = useAuthContext();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBookings(mockBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(t("errors.fetchBookings"));
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user, t]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "booking";
      case "completed":
        return "success";
      case "cancelled":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const handleCancelBooking = (bookingId) => {
    // TODO: Implement booking cancellation
    console.log("Cancel booking:", bookingId);
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "all") return true;
    return booking.status === activeTab;
  });

  if (authLoading || loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, color: "primary.main" }}
      >
        {t("myBookings.title")}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        sx={{ mb: 4 }}
        textColor="booking"
        indicatorColor="booking"
      >
        <Tab label={t("bookingStatus.all")} value="all" />
        <Tab label={t("bookingStatus.upcoming")} value="upcoming" />
        <Tab label={t("bookingStatus.completed")} value="completed" />
        <Tab label={t("bookingStatus.cancelled")} value="cancelled" />
      </Tabs>

      {filteredBookings.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            backgroundColor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {activeTab === "all"
              ? t("myBookings.noBookings")
              : t("myBookings.noBookingsStatus", {
                  status: t(`bookingStatus.${activeTab}`),
                })}
          </Typography>
          <Button
            variant="contained"
            color="booking"
            onClick={() => navigate("/hotels")}
            sx={{ mt: 2 }}
          >
            {t("myBookings.exploreHotels")}
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredBookings.map((booking) => (
            <Grid item xs={12} key={booking.id}>
              <Card sx={{ display: "flex", height: "100%" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 280 }}
                  image={booking.image}
                  alt={booking.hotelName}
                />
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h5" component="div">
                        {booking.hotelName}
                      </Typography>
                      <Chip
                        label={t(`bookingStatus.${booking.status}`)}
                        color={getStatusColor(booking.status)}
                        size="small"
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <LocationOn sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2" color="text.secondary">
                        {booking.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <CalendarMonth sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2">
                        {formatDate(booking.checkIn)} -{" "}
                        {formatDate(booking.checkOut)}
                      </Typography>
                    </Box>

                    <Typography variant="h6" sx={{ mb: 2 }}>
                      {t("common.totalPrice", { price: booking.totalPrice })}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        color="booking"
                        endIcon={<ArrowForward />}
                        onClick={() => navigate(`/booking/${booking.id}`)}
                      >
                        {t("myBookings.viewDetails")}
                      </Button>
                      {booking.status === "completed" && !booking.rating && (
                        <Button
                          variant="outlined"
                          color="booking"
                          startIcon={<Star />}
                          onClick={() => {
                            // TODO: Implement review functionality
                            console.log(
                              "Leave review for booking:",
                              booking.id
                            );
                          }}
                        >
                          {t("myBookings.leaveReview")}
                        </Button>
                      )}
                      {booking.status === "upcoming" && (
                        <Button
                          variant="outlined"
                          color="booking"
                          startIcon={<Cancel />}
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          {t("myBookings.cancelBooking")}
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default MyBookings;
