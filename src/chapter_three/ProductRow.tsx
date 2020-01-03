/**
 * Created by Gene on 16/3/11.
 */
import * as React from 'react'

class ProductRow extends React.Component<any, any> {
    render() {
        const { product } = this.props;
        var name = product.stocked ?
            product.name :
            <span style={{color: 'red'}}>
                {product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

export default ProductRow;
