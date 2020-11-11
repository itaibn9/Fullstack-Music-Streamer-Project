import React, { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import  { UserContext }  from "../../services/UserContext";
import network from '../../services/network';
import { Mix } from '../../services/AnalyticsManager';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Box, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



function LoginPage() {
  const classes = useStyles();

  console.log(UserContext);
  const {userName, setUsername} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    Mix.track('App launched');

  }, [])
  const onSubmit = async () => {
    const response = await network.post('/api/user/login', {
      email,
      password
    });
    console.log(response.data);
    if (response.data && response.data.success && response.data.accessToken) {
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      setUsername(response.data.name);
      window.location = '/';
    } else {
      console.log(response.response.data.errorMessage)
      setError(response.response.data.errorMessage)
      setEmail('');
      setPassword('');
    }
  }
  return(
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={email}
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          value={password}
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          
          onClick={onSubmit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/api/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt={8}>
    </Box>
  </Container>
  );
}
export default LoginPage;