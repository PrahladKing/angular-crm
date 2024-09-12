import { ActionReducer, Action } from "@ngrx/store";
import { TodoEffects } from "./effects/todo.effect";
import { TodoState, todoReducer } from "./reducers/todo.reducer";

export interface AppState {
    todo: TodoState
  }
  
  export interface AppStore {
    todo: ActionReducer<TodoState, Action>;
  }
  
  export const appStore: AppStore = {
    todo: todoReducer
  }
  
export const appEffects = [TodoEffects];