import { Component } from "react"
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import { Navigate, Link } from "react-router-dom";

export default class SignUp extends Component {
    state = {
      redirect: undefined
    }

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
            Choose a Role
          </Typography>
          <Button sx={{ mt: 3, mb: 2 }} variant="contained" onClick={() => this.setState({ redirect: '/signup/minder' })}>Minder</Button>
          <Button sx={{ mt: 3, mb: 2 }} variant="contained" onClick={() => this.setState({ redirect: '/signup/parent' })}>Parent</Button>
          <Button sx={{ mt: 3, mb: 2 }} variant="contained" onClick={() => this.setState({ redirect: '/signup/admin' })}>Admin</Button>
          <Link to="/login" variant="body2">
              {"Already have an account? Log In"}
          </Link>
        </Box>
      </Container>
    }
}