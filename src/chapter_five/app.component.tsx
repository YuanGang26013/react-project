/**
 * Created by Gene on 16/3/16.
 */
import * as React from 'react'
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import IndexComponent from './index.component';
import counter from './reducers';

const store = createStore(counter);

class AppComponent extends React.Component<any, any> {
    render() {
        return (
            <Provider store={store}>
                <IndexComponent />
            </Provider>
        )
    }
}

export default AppComponent;
