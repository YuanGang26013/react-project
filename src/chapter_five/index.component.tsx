/**
 * Created by Gene on 16/3/16.
 */


import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import * as Actions from './actions';

class IndexComponent extends React.Component<any, any> {
    render() {
        const { value, increment } = this.props;

        return (
            <div>
                <span>{value}</span>
                <button onClick={increment}>Increase</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        value : state.count
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions as any, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexComponent);
