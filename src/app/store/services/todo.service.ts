import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getAll(): Observable<Todo[]> {
    return of(
      [{
        id: 1,
        description: 'description 1',
        completed: false
      },
      {
        id: 2,
        description: 'description 2',
        completed: false
      }]
    ).pipe(delay(2000))
  }
}
