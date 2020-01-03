/**
 * Created by Gene on 16/4/11.
 */
import * as React from 'react'

class MKTableViewScroll extends React.Component<any, any> {
    
    private surplusHeight: number;
    private scrollContainerStyle: any;
    private scrollStyle: any;

    
    initializeScrollBar(scrollContainerHeight, scrollContentHeight) {
        let scrollHeightPercent = scrollContainerHeight / scrollContentHeight;

        let scrollHeight = scrollContainerHeight * scrollHeightPercent;
        this.surplusHeight = scrollContainerHeight - scrollHeight;

        this.scrollContainerStyle.height = scrollContainerHeight + 'px';
        this.scrollStyle.height = scrollHeight + 'px'
    }


    componentDidMount():void {
        this.scrollContainerStyle = this.refs['scrollBarContainer']['style'];
        this.scrollStyle = this.refs['scrollBar']['style'];
    }
    
    setScrollOpacity = (opacity) => {
        this.refs['scrollBarContainer']['style'].opacity = opacity;
        this.refs['scrollBarContainer']['style'].WebkitTransitionDelay = opacity ? "0s" : ".5s";
    };

    setScrollTranslateY = (scrollTranslateYPercent, duration) => {
        let translateY = this.surplusHeight * scrollTranslateYPercent;
        this.scrollStyle['webkitTransitionDuration'] = duration+"ms";
        this.scrollStyle['webkitTransform'] = "translate3d(0px, "+ translateY+"px, 0px)";
    };

    render() {
        return (
            <div className="mk_table_view_scroll_container" ref="scrollBarContainer">
                <div className="mk_table_view_scroll"  ref="scrollBar"></div>
            </div>
        )
    }
}

export default MKTableViewScroll;
