import { Component } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from "@mui/system";

export default class QualificationsPanel extends Component {
  state = {
    qualifications: [],
    qualificationsLength: 0,
    curriculumVitae: null
  }

  componentDidMount() {
    if(this.props.fields)
      this.setState({ ...this.props.fields })
    else this.props.onChange(this.state)
  }

  onUpdate = () => this.props.onChange({ 
    qualifications: this.state.qualifications, 
    curriculumVitae: this.state.curriculumVitae
  })

  onChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.value })
    this.onUpdate()
  }

  onComplete = () => {
    if(!this.state.qualifications || this.state.qualifications.length < 1)
      return alert('Qualification must be given')
    if(!this.state.curriculumVitae)
      return alert('Curriculum Vitae must be given')
    this.props.onComplete()
  }

  onArrayChange = async (index, evt) => {
    await this.setState((state) => {
        state[evt.target.name][index] = evt.target.value
        return { [evt.target.name]: state[evt.target.name] }
    })
    this.onUpdate()
  }

  onFileChange = async (evt) => {
    await this.setState({ [evt.target.name]: evt.target.files[0] })
    this.onUpdate()
  }

  render() {
    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {this.state.qualifications.map((qualification, index) => <TextField
            error={!this.state.qualifications[index]}
            key={index}
            margin="normal"
            fullWidth
            name="qualifications"
            label="Qualification"
            type="text"
            value={qualification}
            onChange={(event) => this.onArrayChange(index, event)}
        />)
        }
        <Button fullWidth variant="contained" onClick={() => this.setState((state) => {
            if(state.qualificationsLength === state.qualifications.length) {
                state.qualifications.push('')
                return { qualificationsLength: state.qualificationsLength + 1, qualifications: state.qualifications }
            }
            return {}
        })}>Add Qualification</Button>
        <Button
            component="label"
            variant="contained"
            sx={{ margin: 8 }}
        >
            Upload CV
            <input
                name="curriculumVitae"
                type="file"
                hidden
                onChange={this.onFileChange}
            />
        </Button>
        {this.state.curriculumVitae && <div>{this.state.curriculumVitae.name}</div>}
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