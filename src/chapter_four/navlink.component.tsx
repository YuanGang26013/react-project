/**
 * Created by Gene on 16/3/15.
 */

import * as React from 'react'
import { Link } from 'react-router-dom';

class NavLinkComponent extends React.Component<any, any> {
    render() {
        return <Link {...this.props}  activeClassName="active" />
    }
}

export default NavLinkComponent;
