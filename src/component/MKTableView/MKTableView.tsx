/**
 * Created by Gene on 16/4/8.
 */

import * as React from 'react'
import ReactInstance = React.ReactInstance;

import objectAssign = require('object-assign');
import MKTableViewScroll from './MKTableViewScroll';
import MKTableViewCell from "./MKTableViewCell";

interface MKTableViewProps {
    dataSource?:MkTableViewDataSource;
    delegate?:MKTableViewDelegate;
    tableHeaderView?:boolean;
    tableFooterView?:boolean;
    scrollContainerHeight?:number;
    scrollContentHeight?:number;
    limitDisplayTopHeight?:number;
    limitDisplayBottomHeight?:number;
    allowClickOnTableViewCell?:boolean;
    showsHorizontalScrollIndicator?:boolean;
    showsVerticalScrollIndicator?:boolean;
    minPointY?:number;
    maxPointY?:number;
    bounce?:boolean;
}

class MKTableView extends React.Component<MKTableViewProps, any> {

    private dataSource:MkTableViewDataSource;
    private delegate:MKTableViewDelegate;
    private allowClickOnTableViewCell:boolean = false;
    private allowScrollForThisInstance:boolean = false;
    private allowScrollForDelegate:boolean;
    private showsHorizontalScrollIndicator:boolean = true;
    private showsVerticalScrollIndicator:boolean = true;
    private callDelegateOnClickEvent:boolean = false;
    private scrollBar:ReactInstance;
    private startPointX:number = 0;
    private startPointY:number = 0;
    private startTranslateY:number = 0;
    private startTime:number = 0;
    private lastTranslateY:number = 0;
    private needScrollBar:boolean = true;
    private limitDisplayTopHeight:number = 0;
    private limitDisplayBottomHeight:number = 0;
    private minPointY:number = 0;
    private maxPointY:number = 0;
    private endTranslateY:number = 0;
    private scrollStyle:any;
    private dampingForceLevel:number = 3;
    private timer:number;
    private bounce:boolean = true;
    private tableViewStyle:Object;
    private indexPathRegExp = /\$(\d+)\|(\d+)/;
    private cells:Array<any>;
    // For PC onWheel
    private mouseWheelSpeed = 20;

    public tableViewHeight:number = 0;
    public contentViewHeight:number = 0;

    componentWillMount() {

        this.dataSource = this.props.dataSource;
        this.delegate = this.props.delegate;
        this.allowClickOnTableViewCell = this.props.allowClickOnTableViewCell;
        this.bounce = typeof this.props.bounce == 'boolean' ? this.props.bounce : this.bounce;
    }

    componentDidMount() {
        const {limitDisplayTopHeight, limitDisplayBottomHeight, showsVerticalScrollIndicator} = this.props;
        const {mkTableViewContainer, mkTableView} = this.refs;


        this.tableViewHeight = mkTableViewContainer['offsetHeight'];

        this.limitDisplayBottomHeight = limitDisplayBottomHeight || 0;
        this.limitDisplayTopHeight = limitDisplayTopHeight || 0;
        this.maxPointY = limitDisplayTopHeight || this.maxPointY;

        if (showsVerticalScrollIndicator != undefined) {
            this.showsVerticalScrollIndicator = showsVerticalScrollIndicator;
        }

        this.endTranslateY = this.maxPointY * -1;

        window.addEventListener('touchmove', this.touchMove, false);
        window.addEventListener('touchend', this.touchEnd, false);

        this.scrollStyle = this.refs['mkTableView']['style'];
        this.scrollStyle.webkitTransitionDuration = "0ms";
        this.scrollStyle.webkitTransform = "translate(0px, -" + this.limitDisplayTopHeight + "px) translateZ(0px)";
        this.scrollStyle.WebkitTransitionTimingFunction = "cubic-bezier(0.1, 0.57, 0.1, 1)";


        this.initializeTableViewContentHeight();
    }

    componentDidUpdate(prevProps:MKTableViewProps, prevState:any, prevContext:any):void {
        this.initializeTableViewContentHeight();
    }

    private renderTableView() {
        this.cells = [];
        let sectionCount:number = 1;

        if (!this.dataSource) {
            return;
        }

        if (this.dataSource.numberOfSectionsInTableView) {
            sectionCount = this.dataSource.numberOfSectionsInTableView(this);
        }

        this.renderTableViewSections(this.dataSource, this.delegate, sectionCount, this.cells);
        return this.cells;
    }

    private renderTableViewSections(dataSource, delegate, sectionCount, cells) {

        for (let i = 0; i < sectionCount; i++) {
            this.renderTableViewSection(dataSource, delegate, cells, i);
        }

    }

    private renderTableViewSection(dataSource, delegate, cells, index) {
        this.renderTableViewSectionHeaderOrFooter(dataSource, delegate, cells, index, 'Header');
        this.renderTableViewRows(dataSource, delegate, cells, index);
        this.renderTableViewSectionHeaderOrFooter(dataSource, delegate, cells, index, 'Footer');
    }

    private renderTableViewSectionHeaderOrFooter(dataSource, delegate, cells, index, type) {
        let view:ReactElement<any>;
        let title:string = '';
        let style:Object;

        if (delegate && delegate['heightFor' + type + 'InSection']) {

            let height = delegate['heightFor' + type + 'InSection'](this, index);

            style = {
                'height': height + 'px',
                'lineHeight': height + 'px'
            };
            let settings = {
                style: style,
                key: type + index,
                className: 'mk_table_view_cell_' + type.toLowerCase()
            };

            if (delegate && delegate['viewFor' + type + 'InSection']) {
                view = delegate['viewFor' + type + 'InSection'](this, index, settings)
            } else if (dataSource['titleFor' + type + 'InSection']) {
                title = dataSource['titleFor' + type + 'InSection'](this, index);

                view =<li style={style} className={"mk_table_view_cell_"+ type.toLowerCase()}
                          key={type + index}>{title}</li>
            } else {
                view = <li style={style} className={"mk_table_view_cell_"+ type.toLowerCase()} key={type + index}/>
            }

            cells.push(view);
        }
    }

    private renderTableViewRows(dataSource, delegate, cells, section) {

        let rowsCount:number = dataSource.numberOfRowsInSection(this, section);

        for (let i = 0; i < rowsCount; i++) {
            this.renderTableViewRow(dataSource, delegate, cells, section, i);
        }
    }

    private renderTableViewRow(dataSource, delegate, cells, section, row) {
        let height = 44;
        let style = {};

        if (delegate && delegate.heightForRowAtIndexPath) {
            height = delegate.heightForRowAtIndexPath(this, {section, row});
            style['lineHeight'] = height + 'px';
        }

        style['height'] = height + 'px';

        let settings = {
            style,
            key: section + "|" + row,
            allowClickOnTableViewCell: this.allowClickOnTableViewCell
        };

        cells.push(dataSource.cellForRowAtIndexPath(this, {section, row}, settings));
    }

    private touchStart = (event) => {

        if (this.delegate && this.delegate.onTouchStartEvent) {
            this.delegate.onTouchStartEvent(this, event);
        }

        if (event.target.tagName == "INPUT" ||
            (event.target.tagName == "A" && event.target.className != 'mk_table_view_row_link')) {
            return;
        }

        this.callDelegateOnClickEvent = event.target.className == 'mk_table_view_row_link';

        event.preventDefault();

        this.allowScrollForThisInstance = true;
        this.startPointX = event.touches[0].clientX;
        this.startPointY = event.touches[0].clientY;
        this.startTranslateY = this.lastTranslateY;
        this.startTime = event.timeStamp;

        if (this.needScrollBar && this.showsVerticalScrollIndicator) {

            this.scrollBar['setScrollOpacity'](1);
        }
    };

    private touchMove = (event) => {

        if (!this.allowScrollForThisInstance) {
            return;
        }

        let currentPointX = event.touches[0].clientX;
        let currentPointY = event.touches[0].clientY;
        let distX = currentPointX - this.startPointX;
        let distY = currentPointY - this.startPointY;
        
        
        if (this.delegate && this.delegate.onTouchMoveBegin && this.allowScrollForDelegate === undefined) {
            this.allowScrollForDelegate = this.delegate.onTouchMoveBegin(this, {x: distX, y: distY});
        }

        if (!this.allowScrollForDelegate && this.delegate && this.delegate.onTouchMoveEvent) {
            this.delegate.onTouchMoveEvent(this, event);
            return;
        }

        
        if (distX != 0 && distY != 0) {
            this.callDelegateOnClickEvent = false;
        }

        event.preventDefault();

        let translateY = distY + this.endTranslateY;

        if (translateY <= this.maxPointY && translateY > this.minPointY) {

            let scrollTop = translateY / this.minPointY;

            if (this.showsVerticalScrollIndicator) {
                this.scrollBar['setScrollTranslateY'](scrollTop, 0);
            }

        } else if (translateY >= this.maxPointY) {
            translateY = this.maxPointY + (translateY - this.maxPointY) / (this.dampingForceLevel + (translateY / (this.tableViewHeight * 0.5)));

            if (this.showsVerticalScrollIndicator) {
                this.scrollBar['setScrollTranslateY'](0, 0);
            }

        } else {
            translateY = Math.abs(translateY) + this.minPointY;
            translateY = this.minPointY - translateY / (this.dampingForceLevel + (translateY / (this.tableViewHeight * 0.5)));

            if (this.showsVerticalScrollIndicator) {
                this.scrollBar['setScrollTranslateY'](1, 0);
            }
        }

        this.lastTranslateY = translateY;


        if (this.delegate && this.delegate.scrollViewDidScroll) {
            this.delegate.scrollViewDidScroll(this, {x: 0, y: translateY});
        }

        this.refs['mkTableView']['style']['webkitTransitionDuration'] = "0ms";
        this.refs['mkTableView']['style']['webkitTransform'] = "translate(0px, " + translateY + "px) translateZ(0px)";

    };

    private touchEnd = (event) => {

        if (!this.allowScrollForThisInstance) {
            return;
        } else {
            this.allowScrollForThisInstance = false;
        }

        // 如果是点击事件,回调代理中实现的点击事件,不执行剩余的touchend代码

        if (this.callDelegateOnClickEvent && this.delegate && this.delegate.onClickEvent) {
            let reactid = event.target.parentNode.getAttribute('data-reactid');

            let indexPathList = reactid.match(this.indexPathRegExp);
            if (indexPathList) {
                let indexPath = {
                    section: parseInt(indexPathList[1], 10),
                    row: parseInt(indexPathList[2], 10)
                };

                this.delegate.onClickEvent(this, indexPath, event);
                this.callDelegateOnClickEvent = false;
                return;
            }
        }

        if (this.allowScrollForDelegate === false && this.delegate && this.delegate.onTouchEndEvent) {
            this.delegate.onTouchEndEvent(this, event);
            this.allowScrollForDelegate = undefined;
            return;
        } else {
            this.allowScrollForDelegate = undefined;
        }

        if (this.needScrollBar && this.showsVerticalScrollIndicator) {
            this.scrollBar['setScrollOpacity'](0);
        }

        if (this.timer) {
            clearTimeout(this.timer);
        } else {
            event.preventDefault();
        }

        let {endTranslateY, reset} = this.resetPosition(this.bounce);

        let duration = event.timeStamp - this.startTime;

        if (!reset && duration < 300) {

            let distance = endTranslateY - this.startTranslateY;
            let time = event.timeStamp - this.startTime;
            let speed = Math.abs(distance) / time;
            let deceleration = 0.0006;
            let destination = Math.round(endTranslateY + (speed * speed) / (2 * deceleration) * ( distance < 0 ? -1 : 1 ));

            duration = speed / deceleration;

            if (destination < this.minPointY) {
                destination = this.tableViewHeight ? this.minPointY - ( this.tableViewHeight / 2.5 * ( speed / 8 ) ) : this.minPointY;
                distance = Math.abs(destination - endTranslateY);
                duration = distance / speed;

                this.timer = +setTimeout(() => {
                    this.touchEnd(event);
                }, duration);
            } else if (destination > 0) {
                destination = this.tableViewHeight ? this.tableViewHeight / 2.5 * ( speed / 8 ) : 0;
                distance = Math.abs(endTranslateY) + destination;
                duration = distance / speed;

                this.timer = +setTimeout(() => {
                    this.touchEnd(event);
                }, duration);
            }

            this.endTranslateY = this.lastTranslateY = endTranslateY = destination;

            let scrollTranslateYPercent;

            if (destination > 0) {
                destination = this.limitDisplayTopHeight - 1;
                scrollTranslateYPercent = 0;
            } else if (destination < this.minPointY) {
                destination = this.minPointY - this.limitDisplayBottomHeight + 1;
                scrollTranslateYPercent = 1;
            } else {
                scrollTranslateYPercent = destination / this.minPointY;
            }

            if (this.showsVerticalScrollIndicator) {
                this.scrollBar['setScrollTranslateY'](scrollTranslateYPercent, duration);
            }

            this.scrollStyle['webkitTransitionDuration'] = duration + "ms";
            this.scrollStyle['webkitTransform'] = "translate(0px, " + destination + "px) translateZ(0px)";
        }

        if (this.delegate && this.delegate.scrollViewWillEndDragging) {
            this.delegate.scrollViewWillEndDragging(this, {x: 0, y: endTranslateY});
        }
    };

    private wheelStart

    // For PC onWheel
    private wheel = (event) => {

        event.preventDefault();

        let wheelDeltaX = -event.deltaX;
        let wheelDeltaY = -event.deltaY;

        let translateY = wheelDeltaY + this.endTranslateY;

        if (translateY <= this.maxPointY && translateY > this.minPointY) {

            let scrollTop = translateY / this.minPointY;

            if (this.showsVerticalScrollIndicator) {
                this.scrollBar['setScrollTranslateY'](scrollTop, 0);
            }

        } else if (translateY >= this.maxPointY) {

            translateY = 0;

            if (this.showsVerticalScrollIndicator) {
                this.scrollBar['setScrollTranslateY'](0, 0);
            }
        } else {
            translateY = this.minPointY;

            if (this.showsVerticalScrollIndicator) {
                this.scrollBar['setScrollTranslateY'](1, 0);
            }
        }

        this.endTranslateY = translateY;

        this.refs['mkTableView']['style']['webkitTransitionDuration'] = "0ms";
        this.refs['mkTableView']['style']['webkitTransform'] = "translate(0px, " + translateY + "px) translateZ(0px)";
    };

    private getContentHeight = () => {
        let tableViewHeaderHeight = 0;
        let tableViewFooterHeight = 0;
        let tableViewContentHeight;

        if (this.delegate && this.delegate.heightForHeaderInTableView) {
            tableViewHeaderHeight = this.delegate.heightForHeaderInTableView(this);
        }

        if (this.delegate && this.delegate.heightForFooterInTableView) {
            tableViewFooterHeight = this.delegate.heightForFooterInTableView(this);
        }

        tableViewContentHeight = tableViewHeaderHeight + tableViewFooterHeight;

        let sectionNumber = this.dataSource.numberOfSectionsInTableView(this);
        let tableViewCellHeaderHeight = 0;
        let rowNumber = 0;


        for (let i = 0; i < sectionNumber; i++) {
            if (this.delegate && this.delegate.heightForHeaderInSection) {
                tableViewCellHeaderHeight = this.delegate.heightForHeaderInSection(this, i);
            }

            tableViewContentHeight += tableViewCellHeaderHeight;

            rowNumber = this.dataSource.numberOfRowsInSection(this, i);

            for (let j = 0; j < rowNumber; j++) {
                tableViewContentHeight += this.delegate.heightForRowAtIndexPath(this, {section: i, row: j});
            }
        }

        return tableViewContentHeight;

    };

    private initializeTableViewContentHeight() {
        this.contentViewHeight = this.getContentHeight();

        this.minPointY = this.tableViewHeight - (this.contentViewHeight - this.limitDisplayBottomHeight);
        this.minPointY = this.minPointY > 0 ? 0 : this.minPointY;
        this.needScrollBar = this.contentViewHeight > this.tableViewHeight;


        if (this.showsVerticalScrollIndicator) {
            this.scrollBar = this.refs['tableViewScroll'];
            this.scrollBar['initializeScrollBar'](this.tableViewHeight, this.contentViewHeight);
        }

        this.scrollStyle.height = Math.max(this.tableViewHeight, this.contentViewHeight) + "px";
    }

    public resetScroll() {
        this.endTranslateY = 0;
        this.scrollStyle['webkitTransform'] = "translate(0px, 0px) translateZ(0px)";
        this.scrollBar['setScrollTranslateY'](0, 0);
    }

    public resetPosition(bounce) {

        let endTranslateY = this.lastTranslateY;
        let maxPointY = bounce ? this.maxPointY : 0;
        let minPointY = bounce ? this.minPointY : this.minPointY - this.limitDisplayBottomHeight;

        if (endTranslateY >= maxPointY || bounce ?
            endTranslateY >= maxPointY * -1 :
            endTranslateY <= 0 && endTranslateY >= this.limitDisplayTopHeight * -1 && (maxPointY = this.limitDisplayTopHeight)) {

            this.scrollStyle['webkitTransitionDuration'] = "600ms";
            this.scrollStyle['webkitTransform'] = "translate(0px, -" + maxPointY + "px) translateZ(0px)";

            this.endTranslateY = maxPointY * -1;
            return {endTranslateY, reset: true};
        } else if (endTranslateY <= minPointY || !bounce && endTranslateY < this.minPointY && endTranslateY > this.minPointY - this.limitDisplayBottomHeight && (minPointY = this.minPointY )) {

            this.scrollStyle['webkitTransitionDuration'] = "600ms";
            this.scrollStyle['webkitTransform'] = "translate(0px, " + minPointY + "px) translateZ(0px)";

            this.endTranslateY = minPointY;
            return {endTranslateY, reset: true};
        }

        this.endTranslateY = endTranslateY;

        return {endTranslateY, reset: false};
    }

    public scrollTo(contentOffset:ContentOffset, animated:boolean) {
        this.scrollStyle['webkitTransitionDuration'] = animated == false ? "0ms" : "600ms";
        this.scrollStyle['webkitTransform'] = "translate(0px, " + contentOffset.y + "px) translateZ(0px)";
        this.endTranslateY = this.lastTranslateY = contentOffset.y;
    }

    render() {

        const {scrollContainerHeight, scrollContentHeight, tableHeaderView, tableFooterView} = this.props;

        return (
            <div className="mk_table_view_container" ref="mkTableViewContainer">
                <div style={this.tableViewStyle} ref="mkTableView" onTouchStart={this.touchStart} onWheel={this.wheel}>
                    <ul className="mk_table_view">
                        {tableHeaderView && (this.props.children[0] || this.props.children)}
                        {this.renderTableView()}
                        {tableHeaderView && tableFooterView ? this.props.children[1] : tableFooterView && this.props.children}
                    </ul>
                </div>
                {this.showsVerticalScrollIndicator ? <MKTableViewScroll scrollContainerHeight={scrollContainerHeight}
                                                                        scrollContentHeight={scrollContentHeight}
                                                                        ref="tableViewScroll"/> : null}
            </div>
        )
    }
}

export default MKTableView;
