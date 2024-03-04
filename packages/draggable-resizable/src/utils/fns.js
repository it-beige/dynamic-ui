export function isFunction (func) {
  return (typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]');
}

export function snapToGrid (grid, pendingX, pendingY, scale = 1) {
  const [scaleX, scaleY] = typeof scale === 'number' ? [scale, scale] : scale;
  const x = Math.round((pendingX / scaleX) / grid[0]) * grid[0];
  const y = Math.round((pendingY / scaleY) / grid[1]) * grid[1];
  return [x, y];
}

export function getSize (el) {
  const rect = el.getBoundingClientRect();

  return [
    parseInt(rect.width, 10),
    parseInt(rect.height, 10)
  ];
}

export function computeWidth (parentWidth, left, right) {
  return parentWidth - left - right;
}

export function computeHeight (parentHeight, top, bottom) {
  return parentHeight - top - bottom;
}

export function restrictToBounds (value, min, max) {
  if (min !== null && value < min) {
    return min;
  }

  if (max !== null && max < value) {
    return max;
  }

  return value;
}

export function isUndefined (value) {
  return Object.prototype.toString.call(value) === '[object Undefined]';
}
