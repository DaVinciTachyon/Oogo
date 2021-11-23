import { Component } from "react"
import Typography from "@mui/material/Typography";

export default class MinderPage extends Component {
    render() {
        return <Typography>
            Hello {JSON.parse(localStorage.getItem('user')).firstName}
        </Typography>
    }
}