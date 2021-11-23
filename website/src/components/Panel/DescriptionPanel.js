import { Component } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default class DescriptionPanel extends Component {
  state = {
    description: '',
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
    if(!this.state.description)
      return alert('Description must be given')
    this.props.onComplete()
  }

  render() {
    return <div>
      <TextField
        error={!this.state.description}
        margin="normal"
        required
        fullWidth
        name="description"
        label="Description"
        type="text"
        value={this.state.description}
        onChange={this.onChange}
        multiline
        rows={4}
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