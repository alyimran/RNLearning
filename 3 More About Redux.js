Reducers and Immutable Updates:

Earlier, we talked about "mutation" (modifying existing object/array values) and "immutability" (treating values as something that cannot be changed).

In Redux, our reducers are never allowed to mutate the original / current state values!
// ❌ Illegal - by default, this will mutate the state!
state.value = 123

There are several reasons why you must not mutate state in Redux:

It causes bugs, such as the UI not updating properly to show the latest values
It makes it harder to understand why and how the state has been updated
It makes it harder to write tests
It breaks the ability to use "time-travel debugging" correctly
It goes against the intended spirit and usage patterns for Redux


So if we can't change the originals, how do we return an updated state?
Reducers can only make copies of the original values, and then they can mutate the copies.
// ✅ This is safe, because we made a copy
return {
    ...state,
    value: 123
  }