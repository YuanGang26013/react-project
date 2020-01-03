/**
 * Created by Gene on 16/3/29.
 */

import * as React from 'react'
import { connect } from 'react-redux';
import { addUserAction, modifyUserPropertyAction } from '../actions/manager.action';
import { bindActionCreators } from 'redux';

class NewUserComponent extends React.Component<any, any> {


    addUser = () => {
        const { addUserAction } = this.props;
        addUserAction(
            this.refs[ 'username' ][ 'value' ],
            this.refs[ 'age' ][ 'value' ]
        );
    };

    modifyUser = () => {
        const { modifyUserPropertyAction, params } = this.props;
        modifyUserPropertyAction(
            this.refs[ 'username' ][ 'value' ],
            this.refs[ 'age' ][ 'value' ],
            params.seq
        );
    };

    render() {
        const { match, user = {} } = this.props;
        const { userName = '', age = 0 } = user;
        return (
            <div>
                <input ref="username" placeholder="username" defaultValue={userName}/>
                <input ref="age" placeholder="age" defaultValue={age}/>
                <button onClick={match.path === '/newUser' ? this.addUser : this.modifyUser}>save</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    let { user } = state.managerReducer;
    return {
        user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addUserAction, modifyUserPropertyAction }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NewUserComponent);
