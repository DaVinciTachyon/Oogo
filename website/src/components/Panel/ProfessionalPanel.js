import { Component } from "react"
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from "@mui/material";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default class PersonalPanel extends Component {
  state = {
    experience: 0,
    rate: 0,
    transport: false,
    inHome: false,
  }

  componentDidMount() {
    if(this.props.fields)
      this.setState({ ...this.props.fields })
    else this.props.onChange(this.state)
  }

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value })
    this.props.onChange(this.state)
  }

  onSwitchChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.checked })
    this.props.onChange(this.state)
  }

  onComplete = () => {
    if(!this.state.experience)
      return alert('Experience must be given')
    if(isNaN(this.state.experience) || !Number.isInteger(parseInt(this.state.experience)) || parseInt(this.state.experience) <= 0)
      return alert('Experience must be a positive integer')
    if(!this.state.rate)
      return alert('Rate must be given')
    if(isNaN(this.state.rate) || !Number.isInteger(parseInt(this.state.rate)) || parseInt(this.state.rate) <= 0)
      return alert('Rate must be a positive integer')
    this.props.onComplete()
  }

  render() {
    return <div>
      <TextField
        error={!this.state.experience || isNaN(this.state.experience) || !Number.isInteger(parseInt(this.state.experience)) || parseInt(this.state.experience) <= 0}
        margin="normal"
        required
        fullWidth
        name="experience"
        label="Experience (in years)"
        type="number"
        value={this.state.experience}
        onChange={this.onChange}
      />
      <TextField
        error={!this.state.rate || isNaN(this.state.rate) || parseFloat(this.state.rate) <= 0}
        margin="normal"
        required
        fullWidth
        name="rate"
        label="Rate (in eur)"
        type="number"
        value={this.state.rate}
        onChange={this.onChange}
      />
      <FormControlLabel
        control={<Switch
            margin="normal"
            required
            name="transport"
            checked={this.state.transport}
            onChange={this.onSwitchChange}
          />}
        label="Transport"
        labelPlacement="start"
      />
      <FormControlLabel
        control={<Switch
            margin="normal"
            required
            name="inHome"
            checked={this.state.inHome}
            onChange={this.onSwitchChange}
          />}
        label="In Home"
        labelPlacement="start"
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={this.props.onNext} sx={{ mr: 1 }}>
          Next
        </Button>
        {(this.props.isComplete ? (
            <Button disabled>Complete</Button>
          ) : (
            <Button onClick={this.onComplete}>
              {this.props.isSignUp
                ? 'Sign Up'
                : 'Complete'}
            </Button>
          ))}
      </Box>
    </div>
  }
}