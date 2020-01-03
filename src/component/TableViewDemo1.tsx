/**
 * Created by Gene on 16/4/8.
 */

import * as React from 'react'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';

import reducer from './MKTableView/MKTableViewReducer';
import { MKTableView, MKTableViewCell } from './MKTableView';

const store = createStore(reducer, compose(
    applyMiddleware(
        thunk
    ),
    window[ 'devToolsExtension' ] ? window[ 'devToolsExtension' ]() : f => f
));

class CustomTableViewCell extends MKTableViewCell {

    initializeSubviews() {
        const { text } = this.props;

        return (
            <div>{'CellContent' + text}</div>
        )
    }
}

class CustomTableViewCellForTouch extends MKTableViewCell {

    initializeSubviews() {

        let style : React.CSSProperties = {
            backgroundColor : "red",
            display         : "flex",
            flexDirection   : "column",
            width           : "100%",
            height          : "100%"
        };

        let style1 = {
            flex       : "1 1",
            lineHeight : "normal"
        };

        return (
            <div id="touchPanel" style={style}>
                <div style={style1}>
                    <span>Touch Panel Header</span>
                </div>
                <div style={style1}>
                    <span>Touch Panel Content</span>
                </div>
            </div>
        )
    }
}


class TableViewDemo extends React.Component<any, any> implements MkTableViewDataSource, MKTableViewDelegate {

    data = [
        { text : 'cell1' },
        { text : 'cell2' },
        { text : 'cell3' },
        { text : 'cell4' },
        { text : 'cell5' },
        { text : 'cell6' },
        { text : 'cell7' },
        { text : 'cell8' },
        { text : 'cell9' },
        { text : 'cell10' },
        { text : 'cell11' },
        { text : 'cell12' },
        { text : 'cell13' },
        { text : 'cell14' },
        { text : 'cell15' },
        { text : 'cell16' },
        { text : 'cell17' },
        { text : 'cell18' },
        { text : 'cell19' },
        { text : 'cell20' },
        { text : 'cell21' },
        { text : 'cell22' },
        { text : 'cell23' },
        { text : 'cell24' },
        { text : 'cell25' },
        { text : 'cell26' },
        { text : 'cell27' },
        { text : 'cell28' },
        { text : 'cell29' },
        { text : 'cell31' },
        { text : 'cell32' },
        { text : 'cell33' },
        { text : 'cell34' },
        { text : 'cell35' },
        { text : 'cell36' },
        { text : 'cell37' },
        { text : 'cell38' },
        { text : 'cell39' },
        { text : 'cell41' },
        { text : 'cell42' },
        { text : 'cell43' },
        { text : 'cell44' },
        { text : 'cell45' },
        { text : 'cell46' },
        { text : 'cell47' },
        { text : 'cell48' },
        { text : 'cell49' },
        { text : 'cell51' },
        { text : 'cell52' },
        { text : 'cell53' },
        { text : 'cell54' },
        { text : 'cell55' },
        { text : 'cell56' },
        { text : 'cell57' },
        { text : 'cell58' },
        { text : 'cell59' },
        { text : 'cell61' },
        { text : 'cell62' },
        { text : 'cell63' },
        { text : 'cell64' },
        { text : 'cell65' },
        { text : 'cell66' },
        { text : 'cell67' },
        { text : 'cell68' },
        { text : 'cell69' },
        { text : 'cell71' },
        { text : 'cell72' },
        { text : 'cell73' },
        { text : 'cell74' },
        { text : 'cell75' },
        { text : 'cell76' },
        { text : 'cell77' },
        { text : 'cell78' },
        { text : 'cell79' },
        { text : 'cell81' },
        { text : 'cell82' },
        { text : 'cell83' },
        { text : 'cell84' },
        { text : 'cell85' },
        { text : 'cell86' },
        { text : 'cell87' },
        { text : 'cell88' },
        { text : 'cell89' },
        { text : 'cell91' },
        { text : 'cell92' },
        { text : 'cell93' },
        { text : 'cell94' },
        { text : 'cell95' },
        { text : 'cell96' },
        { text : 'cell97' },
        { text : 'cell98' },
        { text : 'cell99' },
    ];

    private isValidTouchStart : boolean = false;

    // MKTableViewDataSource
    numberOfSectionsInTableView(tableView) {
        return 2;
    }

    numberOfRowsInSection(tableView, section) {
        return section == 0 ? 1 : this.data.length;
    }

    cellForRowAtIndexPath(tableView, indexPath, settings) {
        return <CustomTableViewCell {...settings} {...this.data[ indexPath.row ]}/>
    }

    // MKTableViewDelegate
    heightForRowAtIndexPath(tableView, indexPath) {
        return 44;
    }


    onTouchStartEvent(tableView : React.ReactElement<any> | any, event : Event) : void {
        // 判断touchstart事件是不是发生在左右滑动的Component内部
        // 点击示例红色区域左边的白色区域时TouchStart无效
        this.isValidTouchStart = this.isChildNodeOfTouchPanel(event.target);

        if ( this.isValidTouchStart ) {

            console.log("TouchStart有效,准备自己的滑动代码");
        } else {
            console.log("TouchStart无效,不执行自己的滑动代码");
        }

    }


    onTouchMoveBegin(tableView : React.ReactElement<any> | any, distance : Distance) : boolean {
        if ( !this.isValidTouchStart ) {
            console.log("TouchMove:TouchStart无效");
            return true;
        }

        let allowMKTableViewSlide = Math.abs(distance.y) >= Math.abs(distance.x);

        if ( !allowMKTableViewSlide ) {
            console.log("左右滑动的距离大于上下滑动距离,判断此次滑动为自己的滑动,阻止MKTableView滑动");
        } else {
            console.log("左右滑动的距离小于上下滑动距离,判断此次滑动为MKTableView滑动,自己的滑动代码不执行");
        }
        return allowMKTableViewSlide;
    }

    onTouchMoveEvent(tableView : React.ReactElement<any> | any, event : Event) : void {

        console.log("执行自己的滑动");
    }


    onTouchEndEvent(tableView : React.ReactElement<any> | any, event : Event) : void {
        // 如果是一次有效的touchstart事件,执行自己的滑动结束代码,touchstart无效时,不进此回调
        if ( this.isValidTouchStart ) {
            // 执行自己的滑动结束代码
        }
    }

    isChildNodeOfTouchPanel = (touchElement) => {
        // touchPanel为左右滑动的Component容器ID
        let touchPanelElememnt = document.querySelector("#touchPanel");

        if ( touchElement === touchPanelElememnt ) {
            return true;
        }

        let element = touchElement.parentNode;

        while ( element !== touchPanelElememnt && element.tagName !== "BODY" ) {
            element = element.parentNode;
        }

        return element.tagName !== "BODY";

    };

    render() {
        return (
            <Provider store={store}>
                <MKTableView dataSource={this} delegate={this}/>
            </Provider>
        )
    }
}

export default TableViewDemo;
