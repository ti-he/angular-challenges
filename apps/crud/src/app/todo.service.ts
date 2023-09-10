import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { todo } from './todo.interface';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  get(): Observable<todo[]> {
    return this.http.get<todo[]>(`${this.baseUrl}/todos`);
  }

  update(newTodo: todo): Observable<todo> {
    const data = JSON.stringify({
      userId: newTodo.userId,
      id: newTodo.id,
      title: randText(),
      completed: newTodo.completed,
    });
    const params = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };
    return this.http.put<todo>(
      `${this.baseUrl}/todos/${newTodo.id}`,
      data,
      params
    );
  }

  delete(todoToDelete: todo): Observable<object> {
    return this.http.delete(`${this.baseUrl}/todos/${todoToDelete.id}`);
  }
}
