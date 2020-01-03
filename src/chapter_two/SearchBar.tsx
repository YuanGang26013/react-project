/**
 * Created by Gene on 16/3/11.
 */

import * as React from 'react'

class SearchBar extends React.Component<any, any> {


    componentWillMount():void {
        console.log("SearchBar->componentWillMount");
    }


    componentDidMount():void {
        console.log("SearchBar->componentDidMount");
    }

    render() {
        const { filterText, inStockOnly } = this.props;
        return (
            <form>
                <input type="text" placeholder="Search..." value={filterText}/>
                <p>
                    <input type="checkbox" checked={inStockOnly}/>
                    {' '}
                    Only show products in stock
                </p>
            </form>
        )
    }
}

export default SearchBar;
