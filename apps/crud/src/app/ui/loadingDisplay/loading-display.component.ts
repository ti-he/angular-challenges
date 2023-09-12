import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-display',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading-display.component.html',
  styleUrls: ['./loading-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingDisplayComponent {
  @Input() diameter = 50;
  @Input() isLoading = false;
}
