import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoService } from './core/todo.service';
import { BehaviorSubject, of } from 'rxjs';
import { todo } from './core/interfaces/todo';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let todoService: TodoService;

  beforeEach(() => {
    const todoServiceMock = {
      delete: jest.fn().mockReturnValue(of({})),
    };

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: TodoService, useValue: todoServiceMock }],
    });

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
  });

  it('should delete a todo', (done) => {
    const todoToDelete: todo = {
      id: 2,
      userId: 5,
      title: 'Todo 2',
      completed: true,
    };

    const initialData: todo[] = [
      { id: 1, userId: 1, title: 'Todo 1', completed: false },
      todoToDelete,
      { id: 3, userId: 1, title: 'Todo 3', completed: true },
    ];

    appComponent.todos$.next(initialData);

    appComponent.todos$.subscribe((newTodos) => {
      expect(newTodos).toHaveLength(2);
      expect(newTodos.some((todo) => todo.id === todoToDelete.id)).toBe(false);
      expect(newTodos[0].id).toEqual(1);
      expect(newTodos[1].id).toEqual(3);
      done();
    });

    appComponent.deleteTodo(todoToDelete);
    expect(todoService.delete).toHaveBeenCalledWith(todoToDelete);
  });
});
