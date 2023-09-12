import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../core/loading.service';

@Component({
  selector: 'app-loading-display',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loading-display.component.html',
  styleUrls: ['./loading-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingDisplayComponent {
  public loadingService = inject(LoadingService);
  @Input() diameter = 50;
}
