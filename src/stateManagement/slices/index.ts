import { combineReducers } from '@reduxjs/toolkit'
import { reducerPath as apiSlicePath, reducer as apiSliceReducer } from '../apiSlices/apiSlice'

// Combinar reducers
const reducer = combineReducers({
	[apiSlicePath]: apiSliceReducer,
})

// Types
type RootState = ReturnType<typeof reducer>
type RootAction = Parameters<typeof reducer>[1]

// Destroy redux state
const rootReducer = (state: RootState | undefined, action: RootAction): RootState => {
	return reducer(state, action)
}

// Exports
export default rootReducer