import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForCustomDirective } from './ngForCustom.directive';

export interface Person {
  name: string;
  age: number;
}

const randomPersons = [
  {
    name: 'John',
    age: 20,
  },
  {
    name: 'Jane',
    age: 21,
  },
  {
    name: 'Jack',
    age: 22,
  },
];

@Component({
  standalone: true,
  imports: [NgForCustomDirective],
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styles: ['button { margin: 5px; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];

  empty() {
    this.persons = [];
  }

  addPerson() {
    // This works because we use DoCheck in the directive.
    // With OnChanges, we would have to create a new array.
    this.persons.push(
      randomPersons[Math.floor(Math.random() * randomPersons.length)]
    );
  }
}
