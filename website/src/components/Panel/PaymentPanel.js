import { Component } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default class PaymentPanel extends Component {
  state = {
    name: '',
    iban: '',
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
    if(!this.state.name)
      return alert('Name must be given')
    if(!this.state.iban)
      return alert('IBAN be given')
    this.props.onComplete()
  }

  render() {
    return <div>
      <TextField
        error={!this.state.name}
        margin="normal"
        required
        fullWidth
        name="name"
        label="Full Name"
        type="text"
        value={this.state.name}
        onChange={this.onChange}
      />
      <TextField
        error={!this.state.iban}
        margin="normal"
        required
        fullWidth
        name="iban"
        label="IBAN"
        type="text"
        value={this.state.iban}
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