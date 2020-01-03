/**
 * Created by Gene on 16/4/26.
 */
import * as React from 'react'
class MKTableViewCellFooter extends React.Component<any, any> {

    initializeSubviews(): ReactElement<any> {
        return <span>not implements initializeSubviews</span>;
    }

    render() {

        const {style, key, className} = this.props;

        return (
            <li className={className} style={style} key={key}>
                {this.initializeSubviews()}
            </li>
        )
    }
}

export default MKTableViewCellFooter;
