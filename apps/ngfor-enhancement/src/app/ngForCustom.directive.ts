/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NgFor } from '@angular/common';
import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appNgForCustom]',
  standalone: true,
  hostDirectives: [
    {
      directive: NgFor,
      // Map normal input to input property
      // (has to use a different name)
      inputs: ['ngForOf:appNgForCustomOf'],
    },
  ],
})

// Make this work with mutating the array
// @ts-ignore Generic type
export class NgForCustomDirective extends NgFor<T> implements DoCheck {
  private viewContainerRef = inject(ViewContainerRef);

  // @ts-ignore Generic type
  @Input() appNgForCustomOf: T[] | undefined;
  // input for variable "empty"
  @Input() appNgForCustomEmpty!: TemplateRef<any>;
  // stores the template for empty list, so we can destroy it when needed
  private ref?: EmbeddedViewRef<unknown>;

  override ngDoCheck(): void {
    this.ref?.destroy();

    if (!this.appNgForCustomOf || this.appNgForCustomOf?.length === 0) {
      this.ref = this.viewContainerRef.createEmbeddedView(
        this.appNgForCustomEmpty
      );
    }
  }
}
