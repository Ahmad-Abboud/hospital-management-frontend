import React from "react";
import { Breadcrumbs, Link, Typography, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const BreadcrumbsNav = ({ links, current }) => {
  return (
    <Box
      sx={{
        padding: 2,
        bgcolor: "background.default",
        borderRadius: 1,
        boxShadow: 1,
        mb: 2,
      }}
    >
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary" }}>
        {links.map((link, index) => (
          <Link
            key={link.name}
            component={RouterLink}
            to={link.path}
            sx={{
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                color: "primary.dark",
              },
            }}
          >
            {link.name}
          </Link>
        ))}
        <Typography sx={{ color: "text.primary", fontWeight: "bold" }}>
          {current}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbsNav;
