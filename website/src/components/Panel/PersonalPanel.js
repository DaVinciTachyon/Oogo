import { Component } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default class PersonalPanel extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
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
    if(!this.state.firstName)
      return alert('First name must be given')
    if(!this.state.lastName)
      return alert('Last name must be given')
    if(!this.state.email)
      return alert('Email must be given')
    if(!this.state.age)
      return alert('Age must be given')
    if(isNaN(this.state.age) || !Number.isInteger(parseInt(this.state.age)) || parseInt(this.state.age) <= 0)
      return alert('Age must be a positive integer')
    this.props.onComplete()
  }

  render() {
    return <div>
      <TextField
      error={!this.state.firstName}
        margin="normal"
        required
        fullWidth
        name="firstName"
        label="First Name"
        type="text"
        value={this.state.firstName}
        onChange={this.onChange}
      />
      <TextField
      error={!this.state.lastName}
        margin="normal"
        required
        fullWidth
        name="lastName"
        label="Last Name"
        type="text"
        value={this.state.lastName}
        onChange={this.onChange}
      />
      <TextField
      error={!this.state.email}
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email Address"
        type="email"
        value={this.state.email}
        onChange={this.onChange}
      />
      <TextField
      error={!this.state.age || isNaN(this.state.age) || !Number.isInteger(parseInt(this.state.age)) || parseInt(this.state.age) <= 0}
        margin="normal"
        required
        fullWidth
        name="age"
        label="Age"
        type="age"
        value={this.state.age}
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
    </div>
  }
}