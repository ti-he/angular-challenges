import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from './todo/todo.model';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  baseUrl = 'https://jsonplaceholder.typicode.com/todos';

  getAllTodo = () => {
    return this.http.get<Todo[]>(this.baseUrl);
  };

  update = (id: number) => {
    return this.http.put<Todo>(
      `${this.baseUrl}/${id}`,
      JSON.stringify({
        id: id,
        title: randText(),
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  };

  delete = (id: number) => {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  };
}
