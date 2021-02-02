import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  Formik, Form, Field,
} from 'formik';
import { string, object } from 'yup';
import { Grow } from '@material-ui/core';
import network from '../../services/network';
import { UserContext } from '../../services/UserContext';
import makeToast from '../../services/Toaster';

const validationSchema = object({
  email: string().email().required('email is required'),
  password: string()
    .min(6, 'Password must contain at least 6 characters')
    .required('Enter your password')
    .matches(/^[aA-zZ0-9!@#$%^&*()_+\-=[\]{};:\\|,./?\s]+$/, 'Character not allowed'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  image: {
    backgroundImage: `url(https://www.wallpapertip.com/wmimgs/196-1963020_website-backgrounds-website-login-page-background.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    color: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alertMessage: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const location = useHistory();
  const context = useContext(UserContext);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const initialValues = {
    email: '',
    password: '',
    remember: undefined,
  };

  const login = async (values) => {
    try {
      const { data } = await network.post('/api/user/login', values);
      console.log(data);
      context.logUserIn({ ...data, success: true });
      location.push('/');
    } catch (error) {
      makeToast('error', 'Email or Password is incorrect!');
    }
  };

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grow in={checked}>
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
        </Grow>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  login(values);
                }}
              >
                {({ isValid, isSubmitting }) => (
                  <Form className={classes.form}>
                    <Field name="email">
                      {({
                        field, meta: {
                          error, value, initialValue, touched,
                        },
                      }) => (
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          id="email"
                          label="email"
                          type="text"
                          autoFocus
                          data-test="signin-email"
                          error={(touched || value !== initialValue) && Boolean(error)}
                          helperText={touched || value !== initialValue ? error : ''}
                          {...field}
                        />
                      )}
                    </Field>
                    <Field name="password">
                      {({
                        field, meta: {
                          error, value, initialValue, touched,
                        },
                      }) => (
                        <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label="Password"
                          type="password"
                          id="password"
                          data-test="signin-password"
                          error={touched && value !== initialValue && Boolean(error)}
                          helperText={touched && value !== initialValue && touched ? error : ''}
                          {...field}
                        />
                      )}
                    </Field>
                    <FormControlLabel
                      control={(
                        <Field name="remember">
                          {({ field }) => <Checkbox color="primary" data-test="signin-remember-me" {...field} />}
                        </Field>
                      )}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      data-test="signin-submit"
                      disabled={!isValid || isSubmitting}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <div onClick={() => alert('need to go to the forgot password functionality')}>
                          Forgot password?
                        </div>
                      </Grid>
                      <Grid item>
                        <Link data-test="signup" to="/api/register">
                          Don't have an account? Sign Up
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </div>
          </Grow>
          <Box mt={8} />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;