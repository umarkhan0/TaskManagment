import React, { useEffect } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, resetSignupState } from '../../redux/Features/auth/signUp';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

const Signup = () => {
  const checkSign = localStorage.getItem("Sign");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (checkSign) {
      navigate("/home");
    }
  }, [checkSign, navigate]);

  const { handleSubmit, control, formState: { errors } } = useForm();
  const { isLoading, error, success } = useSelector((state) => state?.signUp);

  useEffect(() => {
    if (success) {
      localStorage.setItem("Sign", success.data.token);
      navigate("/home");
      dispatch(resetSignupState()); // Reset signUp state after successful signup
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      swal({
        title: 'Error!',
        text: typeof error === 'string' ? error : 'An error occurred',
        icon: 'error',
      });
      dispatch(resetSignupState());
    }
  }, [error, dispatch]);

  const onSubmit = (data) => {
    dispatch(signUp(data));
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
            padding: '20px', // Optional: Add padding inside the box
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
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary" sx={{ mb: "4px" }}>
                  Enter name
                </Typography>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      placeholder='Enter Name'
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      autoFocus
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary" sx={{ mb: "4px" }}>
                  Enter Email
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      placeholder='Email is required'
                      fullWidth
                      id="email"
                      name="email"
                      autoComplete="email"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary" sx={{ mb: "4px" }}>
                  Enter Password
                </Typography>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long'
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: 'Password must contain at least one letter and one number'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      required
                      fullWidth
                      placeholder='Enter Password'
                      name="password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      error={!!errors.password}
                      helperText={errors.password ? errors.password.message : ''}
                    />
                  )}
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" variant="body2">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
