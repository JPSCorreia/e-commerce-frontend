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
import { useAuthUserMutation } from '../Features/authApiSlice';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [authUser] = useAuthUserMutation();


  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget.data);

    console.log(event)

    await authUser({
      username,
      password,
    });

    console.log({
      username,
      password,
    });
  }

const handleClick = () => {
  console.log(process.env.REACT_APP_BACKEND_URL)
  fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: "POST",
        body: { username, password }
  })
};

  return(
    <div className="LoginForm">
      <h1>Login</h1>
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
        id="outlined-required"
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
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={password}
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
      >Sign In
    </Button>
    <button onClick={handleClick}>login</button>
    </div>
  )
}

export default LoginForm;