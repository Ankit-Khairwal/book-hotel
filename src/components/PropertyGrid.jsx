import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import PropertyCard from "./PropertyCard";
import { useTranslation } from "react-i18next";

function PropertyGrid({ properties, loading, error }) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Typography variant="h6" color="text.secondary">
          {t("common.noResults")}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {properties.map((property) => (
        <Grid item key={property.id} xs={12} sm={6} md={4} lg={3}>
          <PropertyCard property={property} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PropertyGrid;
