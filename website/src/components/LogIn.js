import { Component } from "react"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link'
import axios from 'axios'
import { Navigate } from "react-router-dom";

export default class LogIn extends Component {
    state = {
        redirect: undefined
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        try {
            const response = await axios.post('http://localhost:8080/api/user/login/', {
                email: form.get('email'),
                password: form.get('password')
            })
            localStorage.setItem('Authorization', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
            this.setState({ redirect: '/' })
        } catch(err) {
            if(err.response) alert(err.response.data.error)
            else console.error(err)
        }
    };

    render() {
      if (this.state.redirect) return <Navigate to={this.state.redirect} />
      return <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              id="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Link href="/signup" variant="body2">
                {"Want an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Container>
    }
}