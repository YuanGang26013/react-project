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

    componentWillMount():void {
        console.log("FilterableProductTable->componentWillMount");
    }


    componentDidMount():void {
        console.log("FilterableProductTable->componentDidMount");
    }

    render() {
        const {products} = this.props;

        return (
            <div>
                <SearchBar filterText={this.state.filterText}
                           inStockOnly={this.state.inStockOnly}/>
                <ProductTable products={products} />
            </div>
        )
    }
}

export default FilterableProductTable;
