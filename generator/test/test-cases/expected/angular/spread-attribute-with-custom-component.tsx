import InnerWidget, { DxInnerWidgetModule } from './dx-inner-widget';

export class WidgetInput {}

import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'dx-widget',
  template: `<dx-inner-widget
              [selected]="(__attr1.selected!==undefined?__attr1.selected:false)"
              [value]="__attr1.value"
              (onSelect)="__attr1.onSelect($event)"
              (valueChange)="__attr1.valueChange($event)"
            ></dx-inner-widget>`,
})
export default class Widget extends WidgetInput {
	get __attr1(): any {
		return { value: 100, selected: true };
	}
	get __restAttributes(): any {
		return {};
	}
}
@NgModule({
	declarations: [Widget],
	imports: [
      DxInnerWidgetModule,
      CommonModule
  ],
	exports: [Widget],
})
export class DxWidgetModule {}