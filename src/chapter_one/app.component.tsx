/**
 * Created by Gene on 16/3/11.
 */
import * as React from 'react'

class AppComponent extends React.Component<any, any> {

    render() {
        return <div>Hello {this.props['name']}</div>
    }
}

export default AppComponent;
