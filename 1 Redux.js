What is Redux?
Redux is a pattern and library for managing and updating application state, using events called "actions". 
It serves as a centralized store for state that needs to be used across your entire application,
with rules ensuring that the state can only be updated in a predictable fashion.

Why Should I Use Redux?
Redux helps you manage "global" state - state that is needed across many parts of your application.

The patterns and tools provided by Redux make it easier to understand when, where, why, and how the 
state in your application is being updated, and how your application logic will behave when those 
changes occur. Redux guides you towards writing code that is predictable and testable, which helps 
give you confidence that your application will work as expected.


When Should I Use Redux?
Redux helps you deal with shared state management, but like any tool, it has tradeoffs. There are more concepts to learn, and more code to write. It also adds some indirection to your code, and asks you to follow certain restrictions. It's a trade-off between short term and long term productivity.

Redux is more useful when:

You have large amounts of application state that are needed in many places in the app
The app state is updated frequently over time
The logic to update that state may be complex
The app has a medium or large-sized codebase, and might be worked on by many people

Immutable Updates To state:
Redux expects that all state updates are done immutably. 
This means that the state is never changed directly, but instead, a new object is returned. 
This new object is then passed to the reducer function, which returns a new object.



Redux Terminology:
Actions:
An action is a plain JavaScript object that has a type field. You can think of an action as an 
event that describes something that happened in the application.
An action object can have other fields with additional information about what happened. By convention, 
we put that information in a field called payload.

A typical action object might look like this:
const addTodoAction = {
    type: 'todos/todoAdded',
    payload: 'Buy milk'
  }

Action Creators:
An action creator is a function that creates and returns an action object. We typically use these so we 
don't have to write the action object by hand every time.

const addTodo = text => {
    return {
      type: 'todos/todoAdded',
      payload: text
    }
  }


Reducers:
A reducer is a function that receives the current state and an action object, decides how to update the
state if necessary, and returns the new state: (state, action) => newState. You can think of a reducer
as an event listener which handles events based on the received action (event) type.

Note: 
"Reducer" functions get their name because they're similar to the kind of callback function you pass to 
the Array.reduce() method.


Reducers must always follow some specific rules:

1:They should only calculate the new state value based on the state and action arguments
2:They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the existing state and making changes to the copied values.
3:They must not do any asynchronous logic, calculate random values, or cause other "side effects"

Here's a small example of a reducer, showing the steps that each reducer should follow:

const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/increment') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1
    }
  }
  // otherwise return the existing state unchanged
  return state
}



Store:
The current Redux application state lives in an object called the store 

The store is created by passing in a reducer, and has a method called 
getState that returns the current state value

import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: counterReducer })

console.log(store.getState())
// {value: 0}



Dispatch:
The Redux store has a method called dispatch. The only way to update the state is to call
 store.dispatch() and pass in an action object. The store will run its reducer function 
 and save the new state value inside, and we can call getState() to retrieve the updated value:

 store.dispatch({ type: 'counter/increment' })

console.log(store.getState())


You can think of dispatching actions as "triggering an event" in the application. Something happened, 
and we want the store to know about it. Reducers act like event listeners, and when they hear an 
action they are interested in, they update the state in response.

We typically call action creators to dispatch the right action:

const increment = () => {
    return {
      type: 'counter/increment'
    }
  }
  
  store.dispatch(increment())
  
  console.log(store.getState())
  // {value: 2}



Selectors:
Selectors are functions that know how to extract specific pieces of information from a store state value.
As an application grows bigger, this can help avoid repeating logic as different parts of the app need 
to read the same data:

const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
// 2


