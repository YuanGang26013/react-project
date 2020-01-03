/**
 * Created by Gene on 16/3/17.
 */

import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import ToolBarComponent from './toolbar.component';
import UserTableComponent from './user.table.component';
import * as Actions from '../actions/manager.action';


require('../css/manager.sass');

class ManagerComponent extends React.Component<any, any> {

    componentDidMount() {
        const { fetchGetIfNeeded} = this.props;
        fetchGetIfNeeded()
    }

    render() {
        const { users, modifyUserProperty, deleteUser, openUserFormAction } = this.props;

        return (
            <div>
                <ToolBarComponent deleteUser={deleteUser} />
                <UserTableComponent users={users} modifyUserProperty={modifyUserProperty} openUserFormAction={openUserFormAction} />
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        users: state.managerReducer.users
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions as any, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerComponent);
