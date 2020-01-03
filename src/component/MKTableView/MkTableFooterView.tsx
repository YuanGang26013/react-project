/**
 * Created by Gene on 16/4/12.
 */
import * as React from 'react'

class MKTableFooterView extends React.Component<any, any> {

    initializeSubviews(): ReactElement<any> {
        return <div>not implements initializeSubviews</div>;
    }

    render() {
        return <li className="mk_table_footer_view">{this.initializeSubviews()}</li>
    }
}

export default MKTableFooterView;
