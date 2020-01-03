/**
 * Created by Gene on 16/3/21.
 */

import * as React from 'react'
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
import AsyncApp from './AsyncApp';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
));

class AppComponent extends React.Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <AsyncApp />
            </Provider>
        )
    }
}

export default AppComponent;
