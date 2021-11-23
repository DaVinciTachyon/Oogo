import { Component } from "react"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import TextField from '@mui/material/TextField';
import axios from 'axios'
import { Navigate, Link } from "react-router-dom";

export default class BasicSignUp extends Component {
    state = {
        redirect: false
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        if(form.get('password') !== form.get('confirmPassword'))
            return alert('Passwords do not match')
        try {
            await axios.post('http://localhost:8080/api/user/signup', {
              basicDetails: {
                firstName: form.get('firstName'),
                lastName: form.get('lastName'),
                email: form.get('email'),
                password: form.get('password'),
                role: this.props.role
              }
            })
            this.setState({ redirect: true })
        } catch(err) {
            if(err.response) alert(err.response.data.error)
            else console.error(err)
        }
    };

    render() {
        if(this.state.redirect) return <Navigate to='/login' />
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
                Sign Up
            </Typography>
            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1, width: '80vw' }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="firstName"
                    label="First Name"
                    type="text"
                    id="firstName"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    type="text"
                    id="lastName"
                />
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Link to="/signup" variant="body2">
                    {"Want a different role? Choose Role"}
                </Link>
            </Box>
        </Box>
      </Container>
    }
}