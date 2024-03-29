import InnerWidget, { DxInnerWidgetModule } from "./dx-inner-widget";
import { Input, Output, EventEmitter } from "@angular/core";
export class WidgetInput {
  @Input() visible?: boolean;
  @Input() value?: boolean;
  @Output() valueChange: EventEmitter<boolean | undefined> = new EventEmitter();
}

import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewRef,
  forwardRef,
  HostListener,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const CUSTOM_VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Widget),
  multi: true,
};
@Component({
  selector: "dx-widget",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CUSTOM_VALUE_ACCESSOR_PROVIDER],
  inputs: ["visible", "value"],
  outputs: ["valueChange"],
  template: `<dx-inner-widget
    [value]="value"
    (valueChange)="_valueChange($event)"
  ></dx-inner-widget>`,
})
export default class Widget
  extends WidgetInput
  implements ControlValueAccessor {
  get __restAttributes(): any {
    return {};
  }
  _detectChanges(): void {
    setTimeout(() => {
      if (this.changeDetection && !(this.changeDetection as ViewRef).destroyed)
        this.changeDetection.detectChanges();
    });
  }

  @HostListener("valueChange", ["$event"]) change() {}
  @HostListener("onBlur", ["$event"]) touched = () => {};

  writeValue(value: any): void {
    this.value = value;
    this._detectChanges();
  }

  registerOnChange(fn: () => void): void {
    this.change = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }

  _valueChange: any;
  constructor(private changeDetection: ChangeDetectorRef) {
    super();
    this._valueChange = (e: any) => {
      this.valueChange.emit(e);
      this._detectChanges();
    };
  }
}
@NgModule({
  declarations: [Widget],
  imports: [DxInnerWidgetModule, CommonModule],
  entryComponents: [InnerWidget],
  exports: [Widget],
})
export class DxWidgetModule {}
export { Widget as DxWidgetComponent };
