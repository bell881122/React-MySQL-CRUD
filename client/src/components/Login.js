import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Axios from 'axios';

const theme = createTheme();

export default function SignIn() {
  const [movieName, setmovieName] = React.useState('');
  const [movieReview, setmovieReview] = React.useState('');
  const [movieList, setmovieList] = React.useState();

  React.useEffect(() => {
    Axios.get('http://localhost:3001/api/get')
      .then(res => {
        console.log(res.data)
        setmovieList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const dt = ({
      email: data.get('email'),
      password: data.get('password'),
    });
    Axios.post('http://localhost:3001/api/insert', { movieName, movieReview })
      .then(res => {
        alert("SUCCESS");
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleDelete = name => {
    console.log(name)
    Axios.delete(`http://localhost:3001/api/delete/${name}`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleUpdate = () => {
    console.log(movieName, movieReview)
    Axios.put('http://localhost:3001/api/update', { movieName, movieReview })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setmovieName(e.target.value)}
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
              onChange={e => setmovieReview(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {movieName}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>handleUpdate()}
            >
              Update
            </Button>
          </Box>
        </Box>
        <ul>
          {movieList && movieList.map((item, index) => (
            <li key={index}
              onClick={() => handleDelete(item.movieName)}
            >{item.movieName}: {item.movieReview}</li>
          ))}
        </ul>
      </Container>
    </ThemeProvider>
  );
}