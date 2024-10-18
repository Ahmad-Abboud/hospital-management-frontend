import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const BreadcrumbsNav = ({ links, current }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {links.map((link) => (
        <Link component={RouterLink} key={link.name} to={link.path}>
          {link.name}
        </Link>
      ))}
      <Typography color="textPrimary">{current}</Typography>
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
