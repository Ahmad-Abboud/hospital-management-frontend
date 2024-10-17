import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Grid,
  Container,
  Alert,
  Grid2,
} from "@mui/material";
import { login } from "../redux/slices/userSlice"; // Import the async thunk for login
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to store email, password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Get the login status and error message from the Redux store
  const { isLoading, error } = useSelector((state) => state.user);

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Dispatch the login action from the user slice
    dispatch(login({ email, password }))
      .unwrap() // If using `unwrap()` to handle fulfilled/rejected states manually
      .then(() => {
        // Navigate to home on successful login
        navigate("/home");
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Left side with image placeholder */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: "purple",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box textAlign="center">
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 4, fontWeight: "bold" }}
          >
            Hospital logo
          </Typography>
          {/* You can replace this with your actual image */}
          <Box
            sx={{
              width: 256,
              height: 256,
              backgroundColor: "rgba(128, 0, 128, 0.8)",
            }}
          />
        </Box>
      </Grid>

      {/* Right side with login form */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Box}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="white"
      >
        <Container maxWidth="xs">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              component="h2"
              variant="h5"
              sx={{ mt: 6, fontWeight: "bold", color: "gray" }}
            >
              Sign in to your account
            </Typography>

            {/* Error message from Redux state */}
            {error && <Alert severity="error">{error}</Alert>}

            <Box
              component="form"
              onSubmit={handleLogin}
              noValidate
              sx={{ mt: 3 }}
            >
              {/* Email field */}
              <TextField
                required
                fullWidth
                id="email-address"
                label="Email address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />

              {/* Password field */}
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />

              {/* Sign In Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading || submitted} // Disable button while loading or after submission
                sx={{
                  mt: 2,
                  mb: 2,
                  bgcolor: "purple",
                  "&:hover": { bgcolor: "darkpurple" },
                }}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              {/* Sign Up link */}
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}
