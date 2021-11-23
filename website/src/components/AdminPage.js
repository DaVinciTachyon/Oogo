import { Component } from "react"
import UsersPanel from "./Panel/UsersPanel"
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import axios from "axios";
import TabPanel from './Panel/TabPanel'

export default class AdminPage extends Component {
    state = {
        users: [],
        tab: 0
    }

    componentDidMount() {
        this.load()
    }

    load = async () => {
        const response = await axios.get('http://localhost:8080/api/user/search', {
            params: {
                status: [ 'requested', 'discussion', 'active' ]
            },
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        })
        this.setState({ users: response.data.users })
    }

    allyProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleChange = (_event, value) => this.setState({ tab: value })

    onApprove = async (e, params) => {
        e.stopPropagation();

        await axios.patch(`http://localhost:8080/api/user/${params.id}`,
            {
                status: 'active'
            }, 
            {
                headers: {
                    Authorization: localStorage.getItem('Authorization')
                }
        })
        this.load()
    };

    onDiscuss = async (e, params) => {
        e.stopPropagation();

        await axios.patch(`http://localhost:8080/api/user/${params.id}`,
            {
                status: 'discussion'
            }, 
            {
                headers: {
                    Authorization: localStorage.getItem('Authorization')
                }
        })
        this.load()
    };

    onReject = async (e, params) => {
        e.stopPropagation();

        await axios.patch(`http://localhost:8080/api/user/${params.id}`,
            {
                status: 'rejected'
            }, 
            {
                headers: {
                    Authorization: localStorage.getItem('Authorization')
                }
        })
        this.load()
    };

    render() {
        return <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={this.state.tab} onChange={this.handleChange} aria-label="basic tabs example">
                    <Tab label="Requested" {...this.allyProps(0)} />
                    <Tab label="In Discussion" {...this.allyProps(1)} />
                    <Tab label="Active" {...this.allyProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={this.state.tab} index={0}>
                <UsersPanel users={this.state.users.filter((user) => user.status === 'requested')} 
                    renderCell={(params) => 
                        (<div>
                            <Button onClick={(e) => this.onApprove(e, params)} variant='contained'>Approve</Button>
                            <Button onClick={(e) => this.onDiscuss(e, params)}>Discuss</Button>
                            <Button onClick={(e) => this.onReject(e, params)}>Reject</Button>
                        </div>)
                }/>
            </TabPanel>
            <TabPanel value={this.state.tab} index={1}>
                <UsersPanel users={this.state.users.filter((user) => user.status === 'discussion')}  renderCell={(params) => 
                        (<div>
                            <Button onClick={(e) => this.onApprove(e, params)} variant='contained'>Approve</Button>
                            <Button onClick={(e) => this.onReject(e, params)}>Reject</Button>
                        </div>)
                    }
                />
            </TabPanel>
            <TabPanel value={this.state.tab} index={2}>
                <UsersPanel users={this.state.users.filter((user) => user.status === 'active')}  renderCell={(params) => <></>} />
            </TabPanel>
        </div>
    }
}