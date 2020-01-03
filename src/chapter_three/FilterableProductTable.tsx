/**
 * Created by Gene on 16/3/11.
 */

import * as React from 'react'
import SearchBar from './SearchBar';
import ProductTable from './ProductTable'

class FilterableProductTable extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {'filterText':'',inStockOnly:false}
    }

    handleUserInput = (filterText, inStockOnly) => {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        })
    };

    render() {
        const { products } = this.props;

        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                />
                <ProductTable
                    products={products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        )
    }
}

export default FilterableProductTable;
