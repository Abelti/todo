import { createStore, combineReducer } from 'redux';

const initialState  {
    tasks: [],
    completedTasks: []
};

const tasksReducer = (state = initialState.tasks, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        case 'UPDATE_TASK':
            return state.map(task => task.id === action.payload.id ? { ...task, ...action.payload } : task);
        case 'MARK_AS_COMPLETED':
            return state.map(task => task.id !== action.payload);
        default:
            return state;
    }
}

const completedTasksReducer = (state = initialState.completedTasks, action) => {
    switch (action.type) {
        case 'MARK_AS_COMPLETED':
            return [...state, action.payload];
        default:
            return state;
    }
}

const rootReducer = combineReducer({
    tasks: tasksReducer,
    completedTasks: completedTasksReducer
});

const store = createStore(rootReducer);

export default store;