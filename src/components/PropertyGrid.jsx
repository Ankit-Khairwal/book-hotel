import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import PropertyCard from "./PropertyCard";

function PropertyGrid({ properties, loading, error }) {
  const isExtraSmall = useMediaQuery("(max-width:480px)");

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: { xs: "200px", sm: "300px", md: "400px" },
        }}
      >
        <CircularProgress size={isExtraSmall ? 30 : 40} />
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
          minHeight: { xs: "200px", sm: "300px", md: "400px" },
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography color="error" variant={isExtraSmall ? "body2" : "body1"}>
          {error}
        </Typography>
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
          minHeight: { xs: "200px", sm: "300px", md: "400px" },
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant={isExtraSmall ? "body1" : "h6"}
          color="text.secondary"
        >
          No results found
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={{ xs: 2, sm: 2, md: 3 }}>
      {properties.map((property) => (
        <Grid
          item
          key={property.id}
          xs={12}
          sm={6}
          md={4}
          lg={3}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <PropertyCard property={property} />
        </Grid>
      ))}
    </Grid>
  );
}

export default PropertyGrid;
