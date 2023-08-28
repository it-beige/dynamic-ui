// 加法
export function add(num1, num2) {
  const num1Str = num1.toString();
  const num2Str = num2.toString();
  const num1Decimal = num1Str.includes('.') ? num1Str.length - num1Str.indexOf('.') - 1 : 0;
  const num2Decimal = num2Str.includes('.') ? num2Str.length - num2Str.indexOf('.') - 1 : 0;
  const maxDecimal = Math.max(num1Decimal, num2Decimal);
  const multiplier = Math.pow(10, maxDecimal);

  return (num1 * multiplier + num2 * multiplier) / multiplier;
}

// 减法
export function subtract(num1, num2) {
  return add(num1, -num2);
}

// 乘法
export function multiply(num1, num2) {
  const num1Str = num1.toString();
  const num2Str = num2.toString();
  const num1Decimal = num1Str.includes('.') ? num1Str.length - num1Str.indexOf('.') - 1 : 0;
  const num2Decimal = num2Str.includes('.') ? num2Str.length - num2Str.indexOf('.') - 1 : 0;

  return (num1 * Math.pow(10, num1Decimal)) * (num2 * Math.pow(10, num2Decimal)) / Math.pow(10, num1Decimal + num2Decimal);
}

// 除法
export function divide(num1, num2) {
  const num1Str = num1.toString();
  const num2Str = num2.toString();
  const num1Decimal = num1Str.includes('.') ? num1Str.length - num1Str.indexOf('.') - 1 : 0;
  const num2Decimal = num2Str.includes('.') ? num2Str.length - num2Str.indexOf('.') - 1 : 0;

  const multiplier = Math.pow(10, Math.max(num1Decimal, num2Decimal));

  return (num1 * multiplier) / (num2 * multiplier);
}

