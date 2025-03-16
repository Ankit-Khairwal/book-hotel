import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
} from "@mui/material";
import { Language } from "@mui/icons-material";

// Language options grouped by region
const languageOptions = [
  {
    region: "Popular languages",
    languages: [
      { code: "en", name: "English" },
      { code: "es", name: "Español" },
      { code: "fr", name: "Français" },
      { code: "de", name: "Deutsch" },
      { code: "it", name: "Italiano" },
    ],
  },
  {
    region: "Asia",
    languages: [
      { code: "zh", name: "中文 (Chinese)" },
      { code: "ja", name: "日本語 (Japanese)" },
      { code: "ko", name: "한국어 (Korean)" },
      { code: "hi", name: "हिन्दी (Hindi)" },
      { code: "th", name: "ไทย (Thai)" },
    ],
  },
  {
    region: "Europe",
    languages: [
      { code: "ru", name: "Русский (Russian)" },
      { code: "pt", name: "Português" },
      { code: "nl", name: "Nederlands" },
      { code: "pl", name: "Polski" },
      { code: "sv", name: "Svenska" },
    ],
  },
];

// Get language name from code
const getLanguageName = (code) => {
  for (const region of languageOptions) {
    const language = region.languages.find((lang) => lang.code === code);
    if (language) return language.name;
  }
  return "English"; // Default fallback
};

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    // Load saved language preference when component mounts
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
      if (i18n.language !== savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    }
  }, [i18n]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode) => {
    try {
      i18n.changeLanguage(languageCode);
      setCurrentLanguage(languageCode);
      localStorage.setItem("preferredLanguage", languageCode);
    } catch (error) {
      console.error("Error changing language:", error);
    }
    handleClose();
  };

  return (
    <>
      <Button
        startIcon={<Language />}
        onClick={handleClick}
        sx={{
          textTransform: "none",
          color: "text.primary",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        {getLanguageName(currentLanguage)}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxHeight: 400,
            width: 250,
          },
        }}
      >
        {languageOptions.map((region, index) => (
          <div key={region.region}>
            {index > 0 && <Divider />}
            <Typography
              variant="caption"
              sx={{
                px: 2,
                py: 1,
                display: "block",
                color: "text.secondary",
                fontWeight: "bold",
              }}
            >
              {region.region}
            </Typography>
            {region.languages.map((language) => (
              <MenuItem
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                selected={currentLanguage === language.code}
                sx={{
                  py: 1,
                  "&.Mui-selected": {
                    backgroundColor: "primary.light",
                    "&:hover": {
                      backgroundColor: "primary.light",
                    },
                  },
                }}
              >
                <ListItemText primary={language.name} />
              </MenuItem>
            ))}
          </div>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
