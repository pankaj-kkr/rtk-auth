import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import { useLoginMutation } from '../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCredentials } from '../redux/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();

  // useEffect(() => {
  //   dispatch(setCredentials({}));
  //   localStorage.removeItem('user');
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = await login({
      username: username,
      password: password,
    }).unwrap();

    dispatch(setCredentials(user));
    localStorage.setItem('user', JSON.stringify(user));

    navigate('/users', { replace: true });
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4' component='h1' gutterBottom>
        Login
      </Typography>
      <Paper
        elevation={3}
        sx={{
          marginTop: 2,
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <form
          noValidate
          onSubmit={handleSubmit}
          style={{ width: '100%', marginTop: '8px' }}
        >
          <TextField
            variant='outlined'
            margin='normal'
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            sx={{ margin: '24px 0 16px' }}
          >
            Sign In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
export default Login;
