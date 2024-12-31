import { ToDoAction, ToDoState } from "@/types/to-do";

const initialState: ToDoState = {
  todos: [],
};

const todoReducer = (state: ToDoState, action: ToDoAction): ToDoState => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false,
          },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };

    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload.todos,
      };

    default:
      return state;
  }
};

export { todoReducer, initialState };
