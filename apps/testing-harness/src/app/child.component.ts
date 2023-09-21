import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styles: [
    `
      .mat-mdc-slider {
        max-width: 300px;
        width: 100%;
      }

      .mat-mdc-card + .mat-mdc-card {
        margin-top: 8px;
      }
    `,
  ],
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatSliderModule,
    MatIconModule,
  ],
})
export class ChildComponent {
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  back() {
    if (this.value - this.step >= this.min) {
      this.value -= this.step;
    }
  }

  forward() {
    if (this.value + this.step <= this.max) {
      this.value += this.step;
    }
  }
}
