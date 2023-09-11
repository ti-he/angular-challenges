import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { ErrorHandlerService } from './error-handling/error-handler.service';

describe('TodoService', () => {
  let todoService: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService, ErrorHandlerService],
    });
    todoService = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  describe('get', () => {
    it('should return an Observable<todo[]>', (done) => {
      const todosMock = [
        { id: 1, userId: 1, title: 'Todo 1', completed: false },
        { id: 2, userId: 1, title: 'Todo 2', completed: true },
      ];

      todoService.get().subscribe((todos) => {
        expect(todos.length).toBe(2);
        expect(todos).toEqual(todosMock);
        done();
      });

      const req = httpMock.expectOne(`${todoService['baseUrl']}/todos`);
      req.flush(todosMock);
    });
  });

  describe('update', () => {
    it('should update a todo', (done) => {
      const updatedTodo = {
        id: 1,
        userId: 1,
        title: 'Updated',
        completed: true,
      };
      todoService.update(updatedTodo).subscribe((todo) => {
        expect(todo).toEqual(updatedTodo);
        done();
      });

      const req = httpMock.expectOne(
        `${todoService['baseUrl']}/todos/${updatedTodo.id}`
      );
      req.flush(updatedTodo);
    });
  });

  describe('delete', () => {
    it('should delete a todo', (done) => {
      const todoToDelete = {
        id: 1,
        userId: 1,
        title: 'Todo to delete',
        completed: false,
      };

      todoService.delete(todoToDelete).subscribe((response) => {
        expect(response).toBeTruthy();
        done();
      });

      const req = httpMock.expectOne(
        `${todoService['baseUrl']}/todos/${todoToDelete.id}`
      );
      req.flush({});
    });
  });
});
