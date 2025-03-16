import React from "react";
import { useTranslation } from "react-i18next";
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
import LanguageSelector from "./LanguageSelector";

const Footer = () => {
  const { t } = useTranslation();
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
                {t("common.subscribeNewsletter")}
              </Typography>
              <Typography
                variant="body2"
                color="text.primary"
                sx={{ fontWeight: "500" }}
              >
                {t("common.subscribeDescription")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder={t("common.enterEmail")}
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
              {t("common.support")}
            </Typography>
            <Stack spacing={1} sx={{ "& .MuiLink-root": interactiveLinkStyle }}>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.helpCenter")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.safetyInformation")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.cancellationOptions")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.supportDisabilities")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.reportNeighborhoodConcern")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.covid19Resources")}
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={interactiveHeadingStyle}>
              {t("common.community")}
            </Typography>
            <Stack spacing={1} sx={{ "& .MuiLink-root": interactiveLinkStyle }}>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.disasterReliefHousing")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.combatingDiscrimination")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.communityForum")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.referFriend")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.giftCards")}
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={interactiveHeadingStyle}>
              {t("common.hosting")}
            </Typography>
            <Stack spacing={1} sx={{ "& .MuiLink-root": interactiveLinkStyle }}>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.tryHosting")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.airCover")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.exploreHostingResources")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.visitCommunityForum")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.howToHostResponsibly")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.hostInsurance")}
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={interactiveHeadingStyle}>
              {t("common.about")}
            </Typography>
            <Stack spacing={1} sx={{ "& .MuiLink-root": interactiveLinkStyle }}>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.newsroom")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.learnAboutFeatures")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.careers")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.investors")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.sustainability")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.partnerPrograms")}
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
                {t("common.contactUs")}
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
                    {t("common.getDirections")}
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
                {t("common.destinations")}
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
                {t("common.securePayments")}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Security color="primary" />
                <Typography variant="body2">
                  {t("common.secureTransactions")}
                </Typography>
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
              <LanguageSelector />
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
              © {currentYear} Hotel Booking, Inc.{" "}
              {t("common.allRightsReserved")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={interactiveLinkStyle}
              >
                {t("common.privacy")}
              </Link>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={interactiveLinkStyle}
              >
                {t("common.terms")}
              </Link>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={interactiveLinkStyle}
              >
                {t("common.sitemap")}
              </Link>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={interactiveLinkStyle}
              >
                {t("common.cookiePolicy")}
              </Link>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
                sx={interactiveLinkStyle}
              >
                {t("common.accessibility")}
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
