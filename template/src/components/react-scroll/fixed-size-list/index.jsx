import React, { PureComponent } from 'react';

import { cancelTimeout, requestTimeout } from '../../react-window/timer';

import {
  getOffsetForIndex,
  getStartIndexForOffset,
  getStopIndexForStartIndex,
} from './util';

const IS_SCROLLING_DEBOUNCE_INTERVAL = 150;


export default class List extends PureComponent {
  constructor(props) {
    super(props);

    const { initialScrollOffset } = props;
    this.outerRef = null;

    this.resetIsScrollingTimeoutId = null;

    this.itemStyleCaches = {};

    this.onScrollVertical = this.onScrollVertical.bind(this);
    this.resetIsScrolling = this.resetIsScrolling.bind(this);

    this.state = {
      isScrolling: false,
      scrollDirection: 'forward',
      scrollOffset:
        typeof initialScrollOffset === 'number'
          ? initialScrollOffset
          : 0,
    };
  }

  scrollTo(scrollOffset) {
    scrollOffset = Math.max(0, scrollOffset);

    this.setState((prevState) => {
      if (prevState.scrollOffset === scrollOffset) {
        return null;
      }
      return {
        scrollDirection:
          prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
        scrollOffset,
      };
    }, () => {
      this.outerRef.scrollTop = scrollOffset;
      this.resetIsScrollingDebounced();
    });
  }

  // 根据给定的数据索引，计算该行的偏移量
  scrollToItem(index) {
    const { itemCount, height, itemSize } = this.props;
    const { scrollOffset } = this.state;

    index = Math.max(0, Math.min(index, itemCount - 1));

    this.scrollTo(
      getOffsetForIndex(
        {
          height, itemCount, itemSize,
        },
        index,
        scrollOffset,
      ),
    );
  }

  componentDidMount() {
    const { initialScrollOffset } = this.props;
    if (typeof initialScrollOffset === 'number') {
      this.outerRef.scrollTop = initialScrollOffset;
    }
    this.scrollToItem(139811);
  }

  componentWillUnmount() {
    if (this.resetIsScrollingTimeoutId !== null) {
      cancelTimeout(this.resetIsScrollingTimeoutId);
    }
  }

  render() {
    const {
      children: Row,
      className,
      height,
      itemCount,
      itemSize,
      width,
    } = this.props;
    const { isScrolling } = this.state;

    const [startIndex, stopIndex] = this.getRangeToRender();

    const items = [];
    if (itemCount > 0) {
      for (let index = startIndex; index <= stopIndex; index += 1) {
        const sty = this.getItemStyle(index);
        items.push(
          <Row key={index} index={index} style={sty} />,
        );
      }
    }

    const estimatedTotalSize = itemSize * itemCount;

    return (
      <div
        className={className}
        onScroll={this.onScrollVertical}
        ref={(ref) => { this.outerRef = ref; }}
        style={{{
          position: 'relative',
          height,
          width,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          willChange: 'transform',
        }}}
      >
        <div
          style={{{
            height: estimatedTotalSize,
            pointerEvents: isScrolling ? 'none' : undefined,
            width: '100%',
          }}}
        >
          {items}
        </div>
      </div>
    );
  }

  getItemStyle(index) {
    const { itemSize } = this.props;
    let itemStyleCache = this.itemStyleCaches[index];

    if (!itemStyleCache) {
      const offset = index * itemSize;

      this.itemStyleCaches[index] = itemStyleCache = {
        position: 'absolute',
        top: offset,
        height: itemSize,
        width: '100%',
      };
    }

    return itemStyleCache;
  }

  // [overscanStartIndex,overscanStopIndex,visibleStartIndex,visibleStopIndex]
  getRangeToRender() {
    const { overscanCount, itemCount, itemSize } = this.props;
    const { isScrolling, scrollDirection, scrollOffset } = this.state;

    if (itemCount === 0) {
      return [0, 0, 0, 0];
    }
    // 可见区域内的第一行索引
    const startIndex = getStartIndexForOffset(
      itemCount, itemSize,
      scrollOffset,
    );
    // 可见区域内的最后一行索引
    const stopIndex = getStopIndexForStartIndex(
      this.props,
      startIndex,
      scrollOffset,
    );

    const overscanBackward = !isScrolling || scrollDirection === 'backward'
      ? Math.max(1, overscanCount)
      : 1;
    const overscanForward = !isScrolling || scrollDirection === 'forward'
      ? Math.max(1, overscanCount)
      : 1;

    return [
      Math.max(0, startIndex - overscanBackward),
      Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)),
      startIndex,
      stopIndex,
    ];
  }


  onScrollVertical(event) {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;
    this.setState((prevState) => {
      if (prevState.scrollOffset === scrollTop) {
        return null;
      }

      // Prevent Safari's elastic scrolling from causing
      // visual shaking when scrolling past bounds.
      const scrollOffset = Math.max(
        0,
        Math.min(scrollTop, scrollHeight - clientHeight),
      );

      return {
        isScrolling: true,
        scrollDirection:
          prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
        scrollOffset,
      };
    }, this.resetIsScrollingDebounced);
  }


  resetIsScrollingDebounced() {
    if (this.resetIsScrollingTimeoutId !== null) {
      cancelTimeout(this.resetIsScrollingTimeoutId);
    }

    this.resetIsScrollingTimeoutId = requestTimeout(
      this.resetIsScrolling,
      IS_SCROLLING_DEBOUNCE_INTERVAL,
    );
  }

  resetIsScrolling() {
    this.resetIsScrollingTimeoutId = null;
    this.setState({ isScrolling: false }, () => {
      this.itemStyleCaches = {};
    });
  }
}

List.defaultProps = {
  overscanCount: 5,
};
