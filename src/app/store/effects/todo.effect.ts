import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { TodoService } from "../services/todo.service";
import * as TodoActions from "../actions/todo.action"

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoService.getAll().pipe(
          map((todos) => TodoActions.loadTodosSuccess({ todos })),
          catchError((error) =>
            of(TodoActions.loadTodosFailure({ error: error.message }))
          )
        )
      )
    )
  );
  constructor(private actions$: Actions, private todoService: TodoService) {}
}