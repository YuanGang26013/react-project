
/**
 * Created by Gene on 16/4/8.
 */
import * as React from 'react'
class MKTableViewCell extends React.Component<any, any> {

    initializeSubviews(): ReactElement<any> {
        return <span>not implements initializeSubviews</span>;
    }

    render() {

        const {allowClickOnTableViewCell, style, key} = this.props;

        return (
            <li className="mk_table_view_cell" style={style} key={key}>
                {this.initializeSubviews()}
                {allowClickOnTableViewCell ? <a className="mk_table_view_row_link" /> : null}
            </li>
        )
    }
}

export default MKTableViewCell;
