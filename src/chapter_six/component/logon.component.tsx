/**
 * Created by Gene on 16/3/17.
 */

import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


import { fetchPosts } from '../actions/logon.action';

class LogonComponent extends React.Component<any, any> {

    render() {

        return (
            <div>
                <h1>Logon Form</h1>
                <input type="text" ref="theInput" placeholder="user name"/>
                <button onClick={this.onLogonClick}>登陆</button>
            </div>
        )
    }

    onLogonClick = () => {
        const { fetchPosts } = this.props;
        const node = this.refs['theInput'];
        const text = node['value'].trim();
        fetchPosts(text);
    };


}

function mapStateToProps(state) {

    return {
        result: state.logonReducer.rsp,
        isFetching: state.logonReducer.isFetching
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchPosts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LogonComponent);
