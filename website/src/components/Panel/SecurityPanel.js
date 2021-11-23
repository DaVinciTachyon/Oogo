import { Component } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default class SecurityPanel extends Component {
  state = {
    password: '',
    confirmPassword: '',
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

  onComplete = () => {
    if(!this.state.password)
      return alert('Password must be given')
    if(this.state.password !== this.state.confirmPassword)
      return alert('Passwords do not match')
    this.props.onComplete()
  }

  render() {
    return <>
      <TextField
        error={!this.state.password}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        value={this.state.password}
        onChange={this.onChange}
      />
      <TextField
        error={this.state.password !== this.state.confirmPassword}
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={this.state.confirmPassword}
        onChange={this.onChange}
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
    </>
  }
}