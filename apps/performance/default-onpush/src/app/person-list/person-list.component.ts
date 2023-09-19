import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { AddPersonComponent } from './add-person/add-person.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-person-list',
  standalone: true,
  template: `
    <h1 cd-flash class="font-semibold text-center" title="Title">
      {{ title | titlecase }}
    </h1>

    <app-add-person (submitted)="onSubmit($event)"></app-add-person>

    <app-list [names]="names"></app-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    CDFlashingDirective,
    AddPersonComponent,
    ListComponent,
  ],
})
export class PersonListComponent {
  @Input() names: string[] = [];
  @Input() title = '';
  @ViewChild(ListComponent, { static: true })
  private listComp!: ListComponent;

  onSubmit(value: string) {
    this.listComp.add(value);
  }
}
