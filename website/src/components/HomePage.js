import { Component } from "react"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import AdminPage from "./AdminPage";
import MinderPage from "./MinderPage";

export default class HomePage extends Component {

    handleSubmit = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('Authorization')
    }

    render() {
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
          <Typography component="h1" variant="h4">
            Home Page
          </Typography>
          <Box
            sx={{
              alignItems: 'center',
            }}
          >
            {JSON.parse(localStorage.getItem('user')).role === 'admin' && <AdminPage/>}
            {JSON.parse(localStorage.getItem('user')).role === 'minder' && <MinderPage/>}
            <Box 
              component="form" 
              onSubmit={this.handleSubmit}
              sx={{
                alignItems: 'center',
                textAlign: 'right'
              }}
            >
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2, width: 100 }}
              >
                Log Out
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    }
}