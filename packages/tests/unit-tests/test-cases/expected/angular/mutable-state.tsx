class WidgetInput {}

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
  template: `<div></div>`,
})
export default class Widget extends WidgetInput {
  obj!: { value?: number };
  notDefinedObj?: { value?: number };
  definedObj: { value?: number } = { value: 0 };
  __setObj(): any {
    this.obj.value = 0;
    this.definedObj.value = 0;
    this.notDefinedObj = this.notDefinedObj || {};
    this.notDefinedObj.value = 0;
  }
  __getValue(): any {
    const a: number = this.obj.value ?? 0;
    const b: number = this.notDefinedObj?.value ?? 0;
    const c: number = this.definedObj.value ?? 0;
    return a + b + c;
  }
  __getObj(): any {
    return this.obj;
  }
  __destruct(): any {
    const { definedObj, notDefinedObj, obj } = this;
    const a = obj.value;
    const b = definedObj.value;
    const c = notDefinedObj?.value;
  }
  __initialize(): any {
    this.__setObj();
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

  __destroyEffects: any[] = [];
  __viewCheckedSubscribeEvent: Array<(() => void) | null> = [];
  _effectTimeout: any;

  ngAfterViewInit() {
    this._effectTimeout = setTimeout(() => {
      this.__destroyEffects.push(this.__initialize());
    }, 0);
  }

  ngOnDestroy() {
    this.__destroyEffects.forEach((d) => d && d());
    clearTimeout(this._effectTimeout);
  }

  constructor(private changeDetection: ChangeDetectorRef) {
    super();
  }
}
@NgModule({
  declarations: [Widget],
  imports: [CommonModule],

  exports: [Widget],
})
export class DxWidgetModule {}
export { Widget as DxWidgetComponent };
