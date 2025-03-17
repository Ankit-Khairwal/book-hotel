import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
  IconButton,
  Button,
  Link,
  TextField,
  InputAdornment,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  Instagram,
  Facebook,
  Twitter,
  Pinterest,
  Language,
  CurrencyExchange,
  YouTube,
  LinkedIn,
  Send,
  CreditCard,
  Security,
  Verified,
  LocationOn,
  Phone,
  Email,
  AccessTime,
} from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Payment methods
  const paymentMethods = [
    "Visa",
    "MasterCard",
    "American Express",
    "PayPal",
    "Apple Pay",
    "Google Pay",
  ];

  // Interactive link style
  const interactiveLinkStyle = {
    transition: "all 0.2s ease",
    position: "relative",
    color: "#333",
    fontWeight: "500",
    "&:hover": {
      color: "primary.main",
      pl: 0.5,
    },
    "&::before": {
      content: '""',
      position: "absolute",
      width: "0",
      height: "2px",
      bottom: 0,
      left: 0,
      backgroundColor: "primary.main",
      transition: "width 0.3s ease",
    },
    "&:hover::before": {
      width: "100%",
    },
  };

  // Interactive social icon style
  const socialIconStyle = {
    transition: "all 0.3s ease",
    color: "primary.main",
    bgcolor: "rgba(74, 144, 226, 0.1)",
    "&:hover": {
      color: "white",
      bgcolor: "primary.main",
      transform: "translateY(-3px)",
    },
  };

  // Interactive chip style
  const interactiveChipStyle = {
    transition: "all 0.3s ease",
    borderColor: "primary.light",
    fontWeight: "500",
    bgcolor: "white",
    "&:hover": {
      bgcolor: "primary.light",
      color: "white",
      transform: "scale(1.05)",
      borderColor: "primary.main",
    },
  };

  // Interactive heading style
  const interactiveHeadingStyle = {
    fontWeight: "600",
    mb: 2,
    position: "relative",
    display: "inline-block",
    color: "primary.dark",
    "&::after": {
      content: '""',
      position: "absolute",
      width: "30%",
      height: "3px",
      bottom: "-4px",
      left: 0,
      backgroundColor: "primary.main",
      transition: "width 0.3s ease",
    },
    "&:hover::after": {
      width: "100%",
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#f5f5f5",
        borderTop: "1px solid",
        borderColor: "primary.light",
        py: 6,
        mt: "auto",
        color: "text.primary",
        boxShadow: "0px -2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <Container maxWidth={false}>
        {/* Newsletter Subscription */}
        <Box
          sx={{
            mb: 5,
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "600",
                  mb: 1,
                  color: "primary.dark",
                  position: "relative",
                  display: "inline-block",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "30%",
                    height: "2px",
                    bottom: "-4px",
                    left: 0,
                    backgroundColor: "primary.main",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                Subscribe Newsletter
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: "500" }}
              >
                Subscribe description
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Enter email"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    transition: "all 0.3s ease",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "primary.main",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderWidth: "1px",
                      },
                    },
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        edge="end"
                        sx={{
                          transition: "all 0.3s ease",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "white",
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <Send />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ mb: 5, borderColor: "primary.light" }} />

        <Grid
          container
          spacing={4}
          sx={{
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            mb: 4,
          }}
        >
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={interactiveHeadingStyle}>
              Support
            </Typography>
            <Stack spacing={1} sx={{ "& .MuiLink-root": interactiveLinkStyle }}>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Help Center
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Safety Information
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Cancellation Options
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                COVID-19 Response
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Report Neighborhood Concern
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={interactiveHeadingStyle}>
              Community
            </Typography>
            <Stack spacing={1} sx={{ "& .MuiLink-root": interactiveLinkStyle }}>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Disaster Relief Housing
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Combating Discrimination
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Community Forum
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Refer Friend
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Gift Cards
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={interactiveHeadingStyle}>
              Hosting
            </Typography>
            <Stack spacing={1} sx={{ "& .MuiLink-root": interactiveLinkStyle }}>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Try Hosting
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Air Cover
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Explore Hosting Resources
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Visit Community Forum
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                How to Host Responsibly
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Host Insurance
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={interactiveHeadingStyle}>
              About
            </Typography>
            <Stack spacing={1} sx={{ "& .MuiLink-root": interactiveLinkStyle }}>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Newsroom
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Learn About Features
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Careers
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Investors
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Sustainability
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                Partner Programs
              </Link>
            </Stack>
          </Grid>
        </Grid>

        {/* Contact Information */}
        <Box
          sx={{
            mt: 5,
            mb: 4,
            bgcolor: "white",
            p: 3,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={interactiveHeadingStyle}>
                Contact Us
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn fontSize="small" color="primary" />
                  <Typography
                    variant="body2"
                    sx={{ color: "text.primary", mb: 1 }}
                  >
                    123 Booking Street, New York, NY 10001
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    startIcon={<LocationOn />}
                    sx={{
                      mt: 1,
                      textTransform: "none",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        bgcolor: "primary.main",
                        color: "white",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      },
                    }}
                  >
                    Get Directions
                  </Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone fontSize="small" color="primary" />
                  <Typography variant="body2">+1 (800) 123-4567</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email fontSize="small" color="primary" />
                  <Typography variant="body2">
                    support@hotelbooking.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AccessTime fontSize="small" color="primary" />
                  <Typography variant="body2">24/7 Customer Support</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={interactiveHeadingStyle}>
                Destinations
              </Typography>
              <Grid container spacing={1}>
                {[
                  "New York",
                  "Paris",
                  "Tokyo",
                  "London",
                  "Dubai",
                  "Sydney",
                  "Rome",
                  "Bali",
                ].map((city) => (
                  <Grid item key={city}>
                    <Chip
                      label={city}
                      size="small"
                      variant="outlined"
                      clickable
                      sx={{
                        mr: 1,
                        mb: 1,
                        ...interactiveChipStyle,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={interactiveHeadingStyle}>
                Secure Payments
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Security color="primary" />
                <Typography variant="body2">Secure transactions</Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {paymentMethods.map((method) => (
                  <Chip
                    key={method}
                    icon={<CreditCard fontSize="small" />}
                    label={method}
                    size="small"
                    variant="outlined"
                    sx={interactiveChipStyle}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4, borderColor: "primary.light" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            bgcolor: "white",
            p: 2,
            borderRadius: 2,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Button
                startIcon={<CurrencyExchange />}
                sx={{ textTransform: "none" }}
              >
                USD
              </Button>
            </Box>
            <Typography
              variant="body2"
              color="primary.main"
              sx={{ fontWeight: "bold" }}
            >
              © {currentYear} Hotel Booking, Inc. All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={interactiveLinkStyle}
              >
                Privacy
              </Link>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={interactiveLinkStyle}
              >
                Terms
              </Link>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={interactiveLinkStyle}
              >
                Sitemap
              </Link>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={interactiveLinkStyle}
              >
                Cookie Policy
              </Link>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={interactiveLinkStyle}
              >
                Accessibility
              </Link>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: { xs: 2, sm: 0 } }}>
            <Tooltip title="Instagram">
              <IconButton size="small" sx={socialIconStyle}>
                <Instagram />
              </IconButton>
            </Tooltip>
            <Tooltip title="Facebook">
              <IconButton size="small" sx={socialIconStyle}>
                <Facebook />
              </IconButton>
            </Tooltip>
            <Tooltip title="Twitter">
              <IconButton size="small" sx={socialIconStyle}>
                <Twitter />
              </IconButton>
            </Tooltip>
            <Tooltip title="Pinterest">
              <IconButton size="small" sx={socialIconStyle}>
                <Pinterest />
              </IconButton>
            </Tooltip>
            <Tooltip title="YouTube">
              <IconButton size="small" sx={socialIconStyle}>
                <YouTube />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn">
              <IconButton size="small" sx={socialIconStyle}>
                <LinkedIn />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
