/**
 * Created by Gene on 16/3/15.
 */

import * as React from 'react'

import NavLink from './navlink.component'

class ReposComponent extends React.Component<any, any> {

    render() {
        return (
            <div>
                <h2>Repos</h2>
                <ul>
                    <li><NavLink to="/repos/rackt/react-router">React Router</NavLink></li>
                    <li><NavLink to="/repos/facebook/react">React</NavLink></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default ReposComponent;
