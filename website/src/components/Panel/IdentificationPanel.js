import { Component } from "react"
import { Box } from "@mui/system";
import Button from '@mui/material/Button'

export default class IdentificationPanel extends Component {
  state = {
    identification: null,
  }

  componentDidMount() {
    if(this.props.fields)
      this.setState({ ...this.props.fields })
    else this.props.onChange(this.state)
  }

  onFileChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.files[0] })
    this.props.onChange(this.state)
  }

  onComplete = () => {
    if(!this.state.identification)
      return alert('Identification must be given')
    this.props.onComplete()
  }

  render() {
    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Button
            component="label"
            variant="contained"
            sx={{ margin: 8 }}
        >
            Upload Government ID
            <input
                name="identification"
                type="file"
                hidden
                onChange={this.onFileChange}
            />
        </Button>
        {this.state.identification && <div>{this.state.identification.name}</div>}
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
    </Box>
  }
}