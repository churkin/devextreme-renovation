type EventCallBack<Type> = (e: Type) => void;
const device = "ios";
function isDevice() {
  return true;
}

import { Input, Output, EventEmitter } from "@angular/core";
export class WidgetInput {
  @Input() height: number = 10;
  @Input() export: object = {};
  @Input() array: any = ["1"];
  @Input() expressionDefault: string = device === "ios" ? "yes" : "no";
  @Input() expressionDefault1: boolean = !device;
  @Input() expressionDefault2: boolean | string = isDevice() || "test";
  @Input() sizes?: { height: number; width: number };
  @Input() stringValue: string = "";
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  @Output() onSomething: EventEmitter<any> = new EventEmitter();
  @Output() stringValueChange: EventEmitter<string> = new EventEmitter();
}

import {
  Component,
  NgModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewRef,
} from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "dx-widget",
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: [
    "height",
    "export",
    "array",
    "expressionDefault",
    "expressionDefault1",
    "expressionDefault2",
    "sizes",
    "stringValue",
  ],
  outputs: ["onClick", "onSomething", "stringValueChange"],
  template: `<span
    >{{(sizes ?? {width:0,height:0}).height
    }}{{(sizes ?? {width:0,height:0}).width}}</span
  >`,
})
export default class Widget extends WidgetInput {
  __getHeight(): number {
    this._onClick(10);
    this._onClick(11);
    return this.height;
  }
  __getRestProps(): { export: object; onSomething: EventCallBack<number> } {
    const { height, onClick, ...rest } = {
      height: this.height,
      export: this.export,
      array: this.array,
      expressionDefault: this.expressionDefault,
      expressionDefault1: this.expressionDefault1,
      expressionDefault2: this.expressionDefault2,
      sizes: this.sizes,
      stringValue: this.stringValue,
      onClick: this._onClick,
      onSomething: this._onSomething,
      stringValueChange: this._stringValueChange,
    };
    return rest;
  }
  get __restAttributes(): any {
    return {};
  }
  _detectChanges(): void {
    setTimeout(() => {
      if (this.changeDetection && !(this.changeDetection as ViewRef).destroyed)
        this.changeDetection.detectChanges();
    });
  }

  _onClick: any;
  _onSomething: any;
  _stringValueChange: any;
  constructor(private changeDetection: ChangeDetectorRef) {
    super();
    this._onClick = (e: any) => {
      this.onClick.emit(e);
    };
    this._onSomething = (e: any) => {
      this.onSomething.emit(e);
    };
    this._stringValueChange = (e: any) => {
      this.stringValueChange.emit(e);
      this._detectChanges();
    };
  }
}
@NgModule({
  declarations: [Widget],
  imports: [CommonModule],

  exports: [Widget],
})
export class DxWidgetModule {}
export { Widget as DxWidgetComponent };
