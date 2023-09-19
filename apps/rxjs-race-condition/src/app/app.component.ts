import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { TopicModalComponent } from './topic-dialog.component';
import { TopicService, TopicType } from './topic.service';

@Component({
  standalone: true,
  selector: 'app-root',
  template: ` <button (click)="openTopicModal()">Open Topic</button> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'rxjs-race-condition';
  dialog = inject(MatDialog);
  topicService = inject(TopicService);
  topics$: Observable<TopicType[]>;

  constructor() {
    this.topics$ = this.topicService.fakeGetHttpTopic().pipe(take(1));
  }

  openTopicModal() {
    this.dialog.open(TopicModalComponent, {
      data: {
        topics$: this.topics$,
      },
    });
  }
}
