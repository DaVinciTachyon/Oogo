import { Component } from "react"
import { DataGrid } from '@mui/x-data-grid';

export default class UsersPanel extends Component {
    render() {
        return <div style={{ height: 500, width: 1220 }}>
            <DataGrid
                rows={this.props.users}
                columns={[
                    { 
                        field: 'name', headerName: 'Name', width: 300, valueGetter: (params) =>
                        `${params.getValue(params.id, 'firstName') || ''} ${
                        params.getValue(params.id, 'lastName') || ''
                        }`, 
                    },
                    { field: 'role', headerName: 'Role', width: 300 },
                    { field: 'email', headerName: 'Email', width: 300 },
                    { field: "action", headerName: "Action", width: 300, sortable: false, renderCell: this.props.renderCell }
                ]}
                pageSize={10}
                rowsPerPageOptions={[5]}
            />
        </div>
    }
}