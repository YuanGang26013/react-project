/**
 * Created by Gene on 16/3/28.
 */

import * as React from 'react'

class UserTableRowComponent extends React.Component<any, any> {

    selected = () => {
        const { modifyUserProperty } = this.props;
        modifyUserProperty(
            this.refs['seq']['innerHTML'],
            this.refs['checkbox']['checked']
        );
    };

    openUserForm = () => {
        const { openUserFormAction, user, seq } = this.props;
        openUserFormAction(user, seq);
    };

    render() {

        const {user, seq} = this.props;

        return (
            <tr>
                <td>
                    <input type="checkbox" onClick={this.selected} ref="checkbox" />
                </td>
                <td ref="seq">{seq}</td>
                <td ref="username">{user.userName}</td>
                <td ref="age">{user.age}</td>
                <td><button onClick={this.openUserForm}>编辑</button></td>
            </tr>
        );
    }
}


export default UserTableRowComponent;
