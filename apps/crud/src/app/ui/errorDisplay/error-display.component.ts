import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../../core/error-handling/error-handler.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDisplayComponent implements OnInit {
  public errorHandlerService = inject(ErrorHandlerService);
  public errorMsg$!: Observable<string | null>;

  ngOnInit(): void {
    this.errorMsg$ = this.errorHandlerService.getErrorMessage();
    this.errorMsg$.subscribe();
  }
}
