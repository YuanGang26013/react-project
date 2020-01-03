/**
 * Created by Gene on 16/4/8.
 */

import * as React from 'react'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';

import reducer from './MKTableView/MKTableViewReducer';
import { MKTableView, MKTableViewCell, MKTableHeaderView, MKTableFooterView} from './MKTableView';
import objectAssign = require("object-assign");

const store = createStore(reducer, compose(
    applyMiddleware(
        thunk
    ),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
));

class CustomTableViewCell extends MKTableViewCell {

    initializeSubviews() {
        const {text} = this.props;

        return (
            <div >{'TestCellContent' + text}</div>
        )
    }
}

class CustomTableViewCell1 extends MKTableViewCell {

    initializeSubviews() {
        const {text} = this.props;

        return (
            <div id="tttttt">{'TestCellContent' + text}</div>
        )
    }
}

class CustomTableHeaderView extends MKTableHeaderView {

    initializeSubviews() {

        const {text} = this.props;

        return <div >{text}</div>
    }
}

class CustomTableFooterView extends MKTableFooterView {

    initializeSubviews() {

        const {text} = this.props;

        return <div>{text}</div>
    }
}

class TableViewContainer extends React.Component<any, any> implements MkTableViewDataSource, MKTableViewDelegate {



    public state = {
        tableHeaderViewText: '下拉刷新',
        tableFooterViewText: '上拉加载更多',
        data : [
            [{text: 'cell1'}, {text: 'cell2'}, {text: 'cell3'}, {text: 'cell4'}, {text: 'cell5'}, {text: 'cell6'}, {text: 'cell7'}, {text: 'cell8'}, {text: 'cell9'}, {text: 'cell10'}]
        ]
    };

    private mkTableView: any;
    
    shouldComponentUpdate(nextProps, nextState) {
        return this.state.tableHeaderViewText != nextState.tableHeaderViewText || this.state.tableFooterViewText != nextState.tableFooterViewText;
    }
    
    // MKTableViewDataSource
    numberOfSectionsInTableView(tableView) {
        return this.state.data.length;
    }
    
    numberOfRowsInSection(tableView, section) {
        return this.state.data[section].length;
    }

    cellForRowAtIndexPath(tableView, indexPath, settings) {
        return indexPath.section == 0 && indexPath.row == 0 ?
            <CustomTableViewCell1 {...settings} {...this.state.data[indexPath.section][indexPath.row]} /> :
            <CustomTableViewCell {...settings} {...this.state.data[indexPath.section][indexPath.row]}/>
    }

    titleForHeaderInSection(tableView, section) {
        return 'title';
    }
    
    // MKTableViewDelegate
    heightForRowAtIndexPath(tableView, indexPath) {
        return 50;
    }

    heightForHeaderInSection(tableView, section) {
        return 30;
    }

    scrollViewDidScroll(tableView, contentOffset) {
        if (contentOffset.y >= 0) {
            this.setState({tableHeaderViewText:"松开刷新"})
        } else {
            this.setState({tableHeaderViewText:"下拉刷新"})
        }

        if (contentOffset.y < tableView.tableViewHeight - (tableView.contentViewHeight + 16)){
            this.setState({
                tableFooterViewText: "松开加载"
            });
        } else {
            this.setState({
                tableFooterViewText: "上拉加载更多"
            })
        }
    }

    scrollViewWillEndDragging(tableView, contentOffset) {
        if (contentOffset.y >= 0) {
            this.setState({
                tableHeaderViewText:"正在加载"
            });

            this.mkTableView = tableView;

            setTimeout(this.finishLoadData.bind(this), 2000);
        }


        if (contentOffset.y < tableView.tableViewHeight - tableView.contentViewHeight) {
            this.setState({
                tableFooterViewText:"正在加载"
            });

            this.mkTableView = tableView;

            setTimeout(this.finishLoadData.bind(this), 2000);
        }


    }

    finishLoadData() {
        let data = objectAssign([], this.state.data);
        data.push([{text: 'cell1'}, {text: 'cell2'}, {text: 'cell3'}, {text: 'cell4'}, {text: 'cell5'}, {text: 'cell6'}, {text: 'cell7'}, {text: 'cell8'}, {text: 'cell9'}, {text: 'cell10'}]);
        this.setState({data: data});
        this.refs['tableView']['refresh']();
        this.mkTableView.resetPosition(true)

    }

    render() {
        return (
            <Provider store={store}>
                <MKTableView ref="tableView" dataSource={this} delegate={this} tableHeaderView={true} tableFooterView={true} bounce={false} limitDisplayTopHeight={16} limitDisplayBottomHeight={16}>
                    <CustomTableHeaderView text={this.state.tableHeaderViewText} />
                    <CustomTableFooterView text={this.state.tableFooterViewText} />
                </MKTableView>
            </Provider>
        )
    }
}

export default TableViewContainer;
