import { object } from "prop-types"
import React from "react"

//Pure vs regular components
1:Regular compnent does not implement componentShouldUpdate() and returns always true

while Pure component implements it with shallow props and state comparision. If there is a 
difference, it will re-render , else it will not re-render.

Based on the concept of purity in functional programming paradigms, a function is said to be pure if it meets the following two conditions:

Its return value is only determined by its input values
Its return value is always the same for the same input values


 Shallow comparision
Primitvie types:
a (sc) returns true if a and b have the same exact value and are of same type

Complex types:
a (sc) returns true if a and b referect the same object.
const a = [1,2]
const b = [1,2]
var c = a
a===b // returns false
a===c // returns true

same goes for objects

cosnt x = {}
const y = {}
var c = x;
x===y // false
x===c // returns true

Why use PureCompnents?
Becauses they can provide you performance boost in certain scenarios. Lets say you have a list of 50
items. By not rendereing them when not required, we can enhance performance boost. 
Note:Always return new object or array when dealing with purecomponents.

Pure compnents in case of functional components?
Use React.memo()

import React, { memo } from 'react';

function PercentageStat({ label, score = 0, total = Math.max(1, score) }) {
  return (
    <div>
      <h6>{ label }</h6>
      <span>{ Math.round(score / total * 100) }%</span>
    </div>
  )
}

// Wrap component using `React.memo()`
export default memo(PercentageStat , arePropsEqual);
with the arePropsEqual() function, you can customize the bailout condition for component updates. 
The arePropsEqual() function is defined with two parameters, prevProps and nextProps.

Deep comparision?
When we compare all the object or array contents and nested array and nested objects as well


Deep copy vs shallow copy
cosnt x = {}
const y = {}
var c = x;
this is shallow copy as changing in c will also change x.

Deep copy:
when we want to copy contents and nested contents as well
1:spread operator: does not deep copy nested object or arrays
2:Object.assign : does not copy nested objects or arrays 
3:JSON.stringify and json. parse does not copy functions
4:Loadash: third party dependency.


