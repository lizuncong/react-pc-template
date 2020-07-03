// Animation frame based implementation of setTimeout.
// Inspired by Joe Lambert, https://gist.github.com/joelambert/1002116#file-requesttimeout-js

const hasNativePerformanceNow = typeof performance === 'object'
  && typeof performance.now === 'function';

const now = hasNativePerformanceNow
  ? () => performance.now()
  : () => Date.now();

// export type TimeoutID = {|
//   id: AnimationFrameID,
// |};

export function cancelTimeout(timeoutID) {
  cancelAnimationFrame(timeoutID.id);
}

export function requestTimeout(callback, delay) {
  const start = now();

  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      // eslint-disable-next-line
      timeoutID.id = requestAnimationFrame(tick);
    }
  }

  const timeoutID = {
    id: requestAnimationFrame(tick),
  };

  return timeoutID;
}
