export const getOffsetForIndex = (
  {
    height, itemCount, itemSize,
  },
  index,
  scrollOffset,
) => {
  const lastItemOffset = Math.max(
    0,
    itemCount * itemSize - height,
  );
  const maxOffset = Math.min(
    lastItemOffset,
    index * itemSize,
  );
  const minOffset = Math.max(
    0,
    (index + 1) * itemSize - height,
  );

  if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
    return scrollOffset;
  } if (scrollOffset < minOffset) {
    return minOffset;
  }
  return maxOffset;
};

export const getStartIndexForOffset = (
  itemCount, itemSize,
  offset,
) => Math.max(
  0,
  Math.min(itemCount - 1, Math.floor(offset / itemSize)),
);

export const getStopIndexForStartIndex = (
  {
    height, itemCount, itemSize,
  },
  startIndex,
  scrollOffset,
) => {
  const offset = startIndex * itemSize;
  const numVisibleItems = Math.ceil(
    (height + scrollOffset - offset) / itemSize,
  );
  return Math.max(
    0,
    Math.min(
      itemCount - 1,
      startIndex + numVisibleItems - 1, // -1 is because stop index is inclusive
    ),
  );
};
