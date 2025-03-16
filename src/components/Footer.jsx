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
} from "@mui/material";
import {
  Instagram,
  Facebook,
  Twitter,
  Pinterest,
  Language,
  CurrencyExchange,
} from "@mui/icons-material";
import LanguageSelector from "./LanguageSelector";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "500", mb: 2 }}>
              {t("common.support")}
            </Typography>
            <Stack spacing={1}>
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
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "500", mb: 2 }}>
              {t("common.community")}
            </Typography>
            <Stack spacing={1}>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.disasterReliefHousing")}
              </Link>
              <Link href="#" underline="hover" color="inherit" variant="body2">
                {t("common.combatingDiscrimination")}
              </Link>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "500", mb: 2 }}>
              {t("common.hosting")}
            </Typography>
            <Stack spacing={1}>
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
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: "500", mb: 2 }}>
              {t("common.about")}
            </Typography>
            <Stack spacing={1}>
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <LanguageSelector />
              <Button
                startIcon={<CurrencyExchange />}
                sx={{ textTransform: "none" }}
              >
                USD
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Hotel Booking, Inc.
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 1 }}>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
              >
                {t("common.privacy")}
              </Link>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
              >
                {t("common.terms")}
              </Link>
              <Link
                href="#"
                underline="hover"
                color="text.secondary"
                variant="body2"
              >
                {t("common.sitemap")}
              </Link>
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
  );
};

export default Footer;
