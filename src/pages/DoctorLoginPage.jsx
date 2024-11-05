import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Alert,
  Avatar,
} from "@mui/material";
import { login } from "../redux/slices/doctorLogin";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import loginImage from "../assets/login-image.jpg";

export default function DoctorLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { isLoading, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    setSubmitted(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.error("Login error:", err);
        setSubmitted(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-blue-800 to-indigo-900">
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: { xs: "100vh", md: "90vh" },
          bgcolor: "white",
          borderRadius: 2,
          m: 3,
          p: 3,
          boxSizing: "border-box",
          overflow: "hidden", // Prevents content from overflowing
        }}
      >
        {/* Image above the form */}
        <Box
          component="img"
          src={loginImage}
          alt="Login"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: 1,
            mb: 3,
            maxHeight: { xs: "30vh", md: "40vh" }, // Adjust image height for small screens
          }}
        />

        {/* Lock icon and title */}
        <Avatar sx={{ bgcolor: "primary.main", mb: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 3, textAlign: "center" }}
        >
          Sign in As a Doctor
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {/* Login form */}
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{ width: "100%", px: 2 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading || submitted}
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </Box>
      </Container>
    </div>
  );
}
