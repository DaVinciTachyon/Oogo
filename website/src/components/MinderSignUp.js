import { Fragment, Component } from "react"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import axios from 'axios'
import { Navigate } from "react-router-dom";
import PersonalPanel from "./Panel/PersonalPanel";
import ProfessionalPanel from "./Panel/ProfessionalPanel";
import QualificationsPanel from "./Panel/QualificationsPanel";
import DescriptionPanel from "./Panel/DescriptionPanel";
import IdentificationPanel from "./Panel/IdentificationPanel";
import PaymentPanel from "./Panel/PaymentPanel";
import SecurityPanel from "./Panel/SecurityPanel";

export default class MinderSignUp extends Component {
    state = {
      activeStep: 0,
      completed: {},
      fields: {}
    }

    steps = ['Personal Information', 'Details', 'Qualifications', 'About Yourself', 'Government ID', 'Payment Method', 'Security']

    handleSubmit = async () => {
        try {
            const { data: { id } } = await axios.post('http://localhost:8080/api/user/signup', {
              basicDetails: {
                firstName: this.state.fields[0]['firstName'],
                lastName: this.state.fields[0]['lastName'],
                age: this.state.fields[0]['age'],
                email: this.state.fields[0]['email'],
                password: this.state.fields[6]['password'],
                role: 'minder'
              },
              details: {
                experience: this.state.fields[1]['experience'],
                qualifications: this.state.fields[2]['qualifications'].join(';'),
                rate: this.state.fields[1]['rate'],
                transport: this.state.fields[1]['transport'],
                inHome: this.state.fields[1]['inHome'],
                description: this.state.fields[3]['description'],
              },
              payment: {
                name: this.state.fields[5]['name'],
                iban: this.state.fields[5]['iban'],
              }
            })
            const cvFile = new FormData()
            cvFile.append('curriculumVitae', this.state.fields[2]['curriculumVitae'])
            await axios.post(`http://localhost:8080/api/user/cv/${id}`, cvFile)
            const idFile = new FormData()
            idFile.append('identification', this.state.fields[4]['identification'])
            await axios.post(`http://localhost:8080/api/user/id/${id}`, idFile)
            this.setState({ redirect: true })
        } catch(err) {
            if(err.response) alert(err.response.data.error)
            else console.error(err)
            this.setState((state) => {
              const completed = state.completed
              completed[state.activeStep] = undefined
              return { completed }
            })
        }
    };

    isLastStep = () => this.state.activeStep === this.totalSteps() - 1;
    totalSteps = () => this.steps.length
    completedSteps = () => Object.keys(this.state.completed).length
    allStepsCompleted = () => this.completedSteps() === this.totalSteps()

    handleNext = async () => {
      const nextStep =
        this.isLastStep() && !this.allStepsCompleted()
          ? this.steps.findIndex((step, i) => !(i in this.state.completed))
          : this.state.activeStep + 1;
      await this.setState({ activeStep: nextStep });
    };

    handleComplete = async () => {
      this.setState((state) => {
        const completed = state.completed
        completed[state.activeStep] = true
        return { completed }
      })
      await this.handleNext();
      if(this.allStepsCompleted()) this.handleSubmit()
    }

    onChange = (newState) => this.setState((state) => {
      state.fields[this.state.activeStep] = newState
      return { fields: state.fields }
    })

    render() {
      if (this.state.redirect) return <Navigate to='/login' />
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
            Sign Up
          </Typography>
          <Box sx={{ mt: 1, width: '80vw' }}>
            <Stepper nonLinear activeStep={this.state.activeStep}>
              {this.steps.map((label, index) => (
                <Step key={label} completed={this.state.completed[index]}>
                  <StepButton color="inherit" onClick={() => this.setState({ activeStep: index })}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              <Fragment>
                {this.state.activeStep === 0 && 
                  <PersonalPanel 
                    fields={this.state.fields[this.state.activeStep]} 
                    onChange={this.onChange} 
                    onNext={this.handleNext} 
                    onComplete={this.handleComplete}
                    isSignUp={this.completedSteps() === this.totalSteps() - 1}
                    isComplete={this.state.completed[this.state.activeStep]}
                  />}
                {this.state.activeStep === 1 && <ProfessionalPanel fields={this.state.fields[this.state.activeStep]} onChange={this.onChange} 
                    onNext={this.handleNext} 
                    onComplete={this.handleComplete}
                    isSignUp={this.completedSteps() === this.totalSteps() - 1}
                    isComplete={this.state.completed[this.state.activeStep]}/>}
                {this.state.activeStep === 2 && <QualificationsPanel fields={this.state.fields[this.state.activeStep]} onChange={this.onChange} 
                    onNext={this.handleNext} 
                    onComplete={this.handleComplete}
                    isSignUp={this.completedSteps() === this.totalSteps() - 1}
                    isComplete={this.state.completed[this.state.activeStep]}/>}
                {this.state.activeStep === 3 && <DescriptionPanel fields={this.state.fields[this.state.activeStep]} onChange={this.onChange} 
                    onNext={this.handleNext} 
                    onComplete={this.handleComplete}
                    isSignUp={this.completedSteps() === this.totalSteps() - 1}
                    isComplete={this.state.completed[this.state.activeStep]}/>}
                {this.state.activeStep === 4 && <IdentificationPanel fields={this.state.fields[this.state.activeStep]} onChange={this.onChange} 
                    onNext={this.handleNext} 
                    onComplete={this.handleComplete}
                    isSignUp={this.completedSteps() === this.totalSteps() - 1}
                    isComplete={this.state.completed[this.state.activeStep]}/>}
                {this.state.activeStep === 5 && <PaymentPanel fields={this.state.fields[this.state.activeStep]} onChange={this.onChange} 
                    onNext={this.handleNext} 
                    onComplete={this.handleComplete}
                    isSignUp={this.completedSteps() === this.totalSteps() - 1}
                    isComplete={this.state.completed[this.state.activeStep]}/>}
                {this.state.activeStep === 6 && <SecurityPanel fields={this.state.fields[this.state.activeStep]} onChange={this.onChange} 
                    onNext={this.handleNext} 
                    onComplete={this.handleComplete}
                    isSignUp={this.completedSteps() === this.totalSteps() - 1}
                    isComplete={this.state.completed[this.state.activeStep]}/>}
              </Fragment>
            </div>
          </Box>
        </Box>
      </Container>
    }
}