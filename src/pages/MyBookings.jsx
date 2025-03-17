import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
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
import { format } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
import { Visibility, RateReview } from "@mui/icons-material";

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

const MyBookings = () => {
  const { user, loading: authLoading } = useAuthContext();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

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
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
        setError("Failed to fetch bookings");
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch (error) {
      console.error("Invalid date format:", error);
      return dateString;
    }
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

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleReviewClick = (bookingId) => {
    // TODO: Implement review functionality
    console.log("Leave review for booking:", bookingId);
  };

  const handleCancelClick = (bookingId) => {
    handleCancelBooking(bookingId);
  };

  return (
    <>
      {authLoading ? (
        <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Container>
      ) : (
        <Box
          sx={{
            backgroundColor: "rgba(245, 248, 255, 1)",
            minHeight: "100vh",
            pt: 2,
            pb: 6,
          }}
        >
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ mb: 3, fontWeight: "bold", color: "primary.main" }}
            >
              My Bookings
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box
              sx={{
                mb: 4,
                bgcolor: "white",
                borderRadius: 2,
                p: 2,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab value="upcoming" label="Upcoming" />
                <Tab value="completed" label="Completed" />
                <Tab value="cancelled" label="Cancelled" />
              </Tabs>
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : bookings.filter((booking) => booking.status === activeTab)
                .length === 0 ? (
              <Box
                sx={{
                  textAlign: "center",
                  py: 4,
                  bgcolor: "white",
                  borderRadius: 2,
                  p: 4,
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  No {activeTab} bookings found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {activeTab === "upcoming"
                    ? "You don't have any upcoming bookings."
                    : activeTab === "completed"
                    ? "You don't have any completed bookings."
                    : "You don't have any cancelled bookings."}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={RouterLink}
                  to="/"
                  sx={{ mt: 2 }}
                >
                  Find Hotels
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {bookings
                  .filter((booking) => booking.status === activeTab)
                  .map((booking) => (
                    <Grid item xs={12} key={booking.id}>
                      <Card
                        sx={{
                          display: "flex",
                          height: "100%",
                          boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
                          borderRadius: 2,
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={booking.image}
                          alt={booking.hotelName}
                          sx={{ width: 280 }}
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                          }}
                        >
                          <CardContent sx={{ flex: "1 0 auto", p: 3 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 2,
                              }}
                            >
                              <Typography variant="h5" component="h2">
                                {booking.hotelName}
                              </Typography>
                              <Chip
                                label={
                                  booking.status.charAt(0).toUpperCase() +
                                  booking.status.slice(1)
                                }
                                color={getStatusColor(booking.status)}
                                size="small"
                                sx={{ ml: "auto" }}
                              />
                            </Box>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <LocationOn
                                sx={{ mr: 1, color: "text.secondary" }}
                              />
                              <Typography
                                variant="body1"
                                color="text.secondary"
                              >
                                {booking.location}
                              </Typography>
                            </Box>

                            <Grid container spacing={2} sx={{ mb: 2 }}>
                              <Grid item xs={12} sm={6}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  Check-in
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <CalendarMonth
                                    fontSize="small"
                                    sx={{ mr: 1, color: "text.secondary" }}
                                  />
                                  <Typography variant="body1">
                                    {formatDate(booking.checkIn)}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  Check-out
                                </Typography>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <CalendarMonth
                                    fontSize="small"
                                    sx={{ mr: 1, color: "text.secondary" }}
                                  />
                                  <Typography variant="body1">
                                    {formatDate(booking.checkOut)}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>

                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold", mb: 1 }}
                            >
                              Total: ${booking.totalPrice}
                            </Typography>

                            <Box sx={{ display: "flex", gap: 2 }}>
                              <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<Visibility />}
                                component={RouterLink}
                                to={`/booking/${booking.id}`}
                                sx={{ mr: 1 }}
                              >
                                View Details
                              </Button>
                              {booking.status === "upcoming" && (
                                <Button
                                  variant="outlined"
                                  color="error"
                                  startIcon={<Cancel />}
                                  onClick={() => handleCancelClick(booking.id)}
                                  sx={{ mr: 1 }}
                                >
                                  Cancel
                                </Button>
                              )}
                              {booking.status === "completed" &&
                                !booking.rating && (
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<RateReview />}
                                    onClick={() =>
                                      handleReviewClick(booking.id)
                                    }
                                  >
                                    Leave Review
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
        </Box>
      )}
    </>
  );
};

export default MyBookings;
