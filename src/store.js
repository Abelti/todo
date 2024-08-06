import { configureStore, createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
        updateTask: (state, action) => {
            const task = state.find(task => task.id === action.payload.id);
            if (task) {
                task.text = action.payload.updates.text;
                task.dueDate = action.payload.updates.dueDate;
            }
        },
        markAsCompleted: (state, action) => {
            const task = state.find(task => task.id === action.payload);
            if (task) {
                task.accomplished = true;
            }
        }
    }
});

const completedTaskSlice = createSlice({
    name: "completedTasks",
    initialState: [],
    reducers: {
        addCompletedTask: (state, action) => {
            state.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(taskSlice.actions.markAsCompleted, (state, action) => {
            const task = action.payload;
            state.push(task);
        });
    }
});

const store = configureStore({
    reducer: {
        tasks: taskSlice.reducer,
        completedTasks: completedTaskSlice.reducer
    }
});

export const { addTask, deleteTask, updateTask, markAsCompleted } = taskSlice.actions;
export const { addCompletedTask } = completedTaskSlice.actions;
export default store;