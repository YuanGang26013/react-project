/**
 * Created by Gene on 16/3/11.
 */

import * as React from 'react'

class ProductCategoryRow extends React.Component<any,any> {
    render() {
        const { category } = this.props;
        return (<tr><th colSpan={2}>{category}</th></tr>)
    }
}

export default ProductCategoryRow;
