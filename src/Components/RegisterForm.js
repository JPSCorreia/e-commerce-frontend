import '../Style/App.css';
import {useState} from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useSelector, useDispatch} from 'react-redux';
import {loginNow} from '../Features/isAuthenticatedSlice';

function RegisterForm() {

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  // Redux State/Action Management.
  const isAuthenticated = useSelector((state) => state.isAuthenticated.value)
  const dispatch = useDispatch();

  const handleLoginNow = () => {
    if (!isAuthenticated) {
      dispatch(loginNow())
      console.log('Logging in')
    }
  }

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const body = { username, firstName, lastName, password }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })

      // get token
      const parseRes = await response.json()
      console.log(parseRes)

      // store in local storage
      localStorage.setItem('token', parseRes.token)

      // set authorized state as true
      handleLoginNow();
      
    } catch (error) {
      console.error(error.message)
    }
  }

  return(
    <div className="RegisterForm">
      <h1>Register</h1>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Username</InputLabel>
      <OutlinedInput
        id="outlined-required-username"
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
        endAdornment={
          <InputAdornment position="end">
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          </InputAdornment>
        }
      />
      </FormControl> 

      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment">First Name</InputLabel>
      <OutlinedInput
        id="outlined-required-firstname"
        label="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.currentTarget.value)}
      />
      </FormControl>

      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment">Last Name</InputLabel>
      <OutlinedInput
        id="outlined-required-lastname"
        label="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.currentTarget.value)}
      />
      </FormControl> 

      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl> 

    </Box>
    <Button
      type="submit"
      variant="contained"
      onClick={handleSubmit}
      sx={{ mt: 3, mb: 2 }}
      >Register
    </Button>
    </div>
  )
}

export default RegisterForm;