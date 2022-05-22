// Equality (==)

// The equality operator (==) checks whether its two operands are equal, 
// returning a Boolean result. Unlike the strict equality operator, 
// it attempts to convert and compare operands that are of different types.

console.log(1 == 1);
// expected output: true

console.log('hello' == 'hello');
// expected output: true

console.log('1' ==  1);
// expected output: true

console.log(0 == false);
// expected output: true

//Strict Equality
// The strict equality operator (===) checks whether its two operands are equal,
//  returning a Boolean result. Unlike the equality operator, the strict equality
//   operator always considers operands of different types to be different.

console.log(1 === 1);
// expected output: true

console.log('hello' === 'hello');
// expected output: true

console.log('1' ===  1);
// expected output: false

console.log(0 === false);
// expected output: false

console.log("hello" === "hello");   // true
console.log("hello" === "hola");    // false

console.log(3 === 3);               // true
console.log(3 === 4);               // false

console.log(true === true);         // true
console.log(true === false);        // false

console.log(null === null);         // true