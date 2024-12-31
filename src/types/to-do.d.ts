type ToDo = {
  id: string;
  text: string;
  completed: boolean;
};

type ToDoState = {
  todos: ToDo[];
};

type ToDoAction =
  | {
      type: "ADD_TODO";
      payload: {
        id: string;
        text: string;
        completed: boolean;
      };
    }
  | {
      type: "TOGGLE_TODO";
      payload: {
        id: string;
      };
    }
  | {
      type: "REMOVE_TODO";
      payload: {
        id: string;
      };
    };

export { ToDo, ToDoState, ToDoAction };
