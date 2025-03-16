import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Rating,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  LocationOn,
  Pool,
  Spa,
  Restaurant,
  Wifi,
  BeachAccess,
  Landscape,
} from "@mui/icons-material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { amenities as amenityTypes } from "../data/properties";

const amenityIcons = {
  [amenityTypes.POOL]: <Pool fontSize="small" />,
  [amenityTypes.SPA]: <Spa fontSize="small" />,
  [amenityTypes.RESTAURANT]: <Restaurant fontSize="small" />,
  [amenityTypes.WIFI]: <Wifi fontSize="small" />,
  [amenityTypes.BEACH_ACCESS]: <BeachAccess fontSize="small" />,
  [amenityTypes.MOUNTAIN_VIEW]: <Landscape fontSize="small" />,
};

function PropertyCard({ property }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/hotels/${property.id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          transform: "translateY(-4px)",
        },
        transition: "all 0.3s ease",
      }}
      onClick={handleCardClick}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="240"
          image={property.images[0]}
          alt={property.name}
          sx={{ objectFit: "cover" }}
        />
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? (
            <Favorite color="primary" />
          ) : (
            <FavoriteBorder color="primary" />
          )}
        </IconButton>
        <Chip
          label={property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            fontWeight: "600",
            color: "booking.dark",
            borderColor: "booking.light",
            "& .MuiChip-label": { px: 1 },
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, pb: 2 }}>
        <Box sx={{ mb: 1 }}>
          <Typography
            variant="h6"
            component="div"
            noWrap
            sx={{ fontWeight: "600", color: "booking.dark" }}
          >
            {property.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <LocationOn sx={{ fontSize: 16, color: "primary.main", mr: 0.5 }} />
            <Typography
              variant="body2"
              sx={{ color: "text.primary", fontWeight: "500" }}
            >
              {property.location.city}, {property.location.country}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Rating
            value={property.rating}
            precision={0.1}
            readOnly
            size="small"
            sx={{ color: "booking.main" }}
          />
          <Typography variant="body2" sx={{ ml: 1, fontWeight: "500" }}>
            ({property.reviews})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
          {property.amenities.slice(0, 4).map(
            (amenity) =>
              amenityIcons[amenity] && (
                <Chip
                  key={amenity}
                  icon={amenityIcons[amenity]}
                  label={t(`amenities.${amenity}`)}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: "booking.light",
                    "& .MuiChip-icon": {
                      color: "booking.main",
                    },
                    fontWeight: "500",
                  }}
                />
              )
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "primary.main", fontWeight: "700" }}
            >
              ${property.price.base}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {t("common.perNight")}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PropertyCard;
