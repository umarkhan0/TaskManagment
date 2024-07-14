import React, { useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography, Container, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetLoginState } from '../../redux/Features/auth/login';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, success } = useSelector((state) => state?.login);

  useEffect(() => {
    const checkSign = localStorage.getItem("Sign");
    if (checkSign) {
      navigate("/home");
    }
  }, [navigate]);

  useEffect(() => {
    if (success) {
      localStorage.setItem("Sign", success.data.token);
      navigate("/home");
      dispatch(resetLoginState()); // Reset login state after successful login
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      swal({
        title: 'Error!',
        text: typeof error === 'string' ? error : 'An error occurred',
        icon: 'error',
      });
      dispatch(resetLoginState());
    }
  }, [error, dispatch]);

  const { handleSubmit, register, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    const credentials = data;
    dispatch(login(credentials));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginY: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add box shadow here
            borderRadius: '8px', // Optional: Add border radius for a rounded look
            padding: '40px 20px', // Optional: Add padding inside the box
            position: 'relative', // To position the spinner overlay
          }}
        >
          {isLoading && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
                zIndex: 1, // Ensure the overlay is on top
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Typography component="h1" variant="h4">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: "4px" }} color="textSecondary">
                  Enter Email
                </Typography>
                <TextField
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  placeholder='Enter Email'
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary" sx={{ mb: "4px" }}>
                  Enter Password
                </Typography>
                <TextField
                  {...register('password', {
                    required: 'Password is required'
                  })}
                  fullWidth
                  name="password"
                  type="password"
                  placeholder='Enter Password'
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading} // Disable button while loading
            >
              Sign In
            </Button>
            <Grid container>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <NavLink to="/signup" variant="body2">
                    Don't have an account? Sign Up
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
