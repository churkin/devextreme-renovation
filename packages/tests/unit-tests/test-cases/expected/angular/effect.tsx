function subscribe(p: string, s: number, i: number) {
  return 1;
}
function unsubscribe(id: number) {
  return undefined;
}

import { Input, Output, EventEmitter } from "@angular/core";
export class WidgetInput {
  @Input() p: string = "10";
  @Input() r: string = "20";
  @Input() s: number = 10;
  @Output() sChange: EventEmitter<number> = new EventEmitter();
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
  inputs: ["p", "r", "s"],
  outputs: ["sChange"],
  template: `<div></div>`,
})
export default class Widget extends WidgetInput {
  i: number = 10;
  j: number = 20;
  __setupData(): any {
    const id = subscribe(this.__getP(), this.s, this.i);
    this._i = 15;
    return () => unsubscribe(id);
  }
  __onceEffect(): any {
    const id = subscribe(this.__getP(), this.s, this.i);
    this._i = 15;
    return () => unsubscribe(id);
  }
  __alwaysEffect(): any {
    const id = subscribe(this.__getP(), 1, 2);
    return () => unsubscribe(id);
  }
  __getP(): any {
    return this.p;
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
  __schedule_setupData() {
    this.__destroyEffects[0]?.();
    this.__viewCheckedSubscribeEvent[0] = () => {
      this.__destroyEffects[0] = this.__setupData();
    };
  }
  __schedule_alwaysEffect() {
    this.__destroyEffects[2]?.();
    this.__viewCheckedSubscribeEvent[2] = () => {
      this.__destroyEffects[2] = this.__alwaysEffect();
    };
  }

  _updateEffects() {
    if (this.__viewCheckedSubscribeEvent.length) {
      clearTimeout(this._effectTimeout);
      this._effectTimeout = setTimeout(() => {
        this.__viewCheckedSubscribeEvent.forEach((s, i) => {
          s?.();
          if (this.__viewCheckedSubscribeEvent[i] === s) {
            this.__viewCheckedSubscribeEvent[i] = null;
          }
        });
      });
    }
  }

  ngAfterViewInit() {
    this._effectTimeout = setTimeout(() => {
      this.__destroyEffects.push(
        this.__setupData(),
        this.__onceEffect(),
        this.__alwaysEffect()
      );
    }, 0);
  }
  ngOnChanges(changes: { [name: string]: any }) {
    if (this.__destroyEffects.length && ["p", "s"].some((d) => changes[d])) {
      this.__schedule_setupData();
    }

    if (this.__destroyEffects.length) {
      this.__schedule_alwaysEffect();
    }
  }
  ngOnDestroy() {
    this.__destroyEffects.forEach((d) => d && d());
    clearTimeout(this._effectTimeout);
  }
  ngAfterViewChecked() {
    this._updateEffects();
  }

  _sChange: any;
  constructor(private changeDetection: ChangeDetectorRef) {
    super();
    this._sChange = (e: any) => {
      this.sChange.emit(e);
      this._detectChanges();
    };
  }
  set _i(i: number) {
    this.i = i;
    this._detectChanges();

    if (this.__destroyEffects.length) {
      this.__schedule_setupData();
    }
    this._updateEffects();

    if (this.__destroyEffects.length) {
      this.__schedule_alwaysEffect();
    }
    this._updateEffects();
  }
  set _j(j: number) {
    this.j = j;
    this._detectChanges();

    if (this.__destroyEffects.length) {
      this.__schedule_alwaysEffect();
    }
    this._updateEffects();
  }
}
@NgModule({
  declarations: [Widget],
  imports: [CommonModule],
  exports: [Widget],
})
export class DxWidgetModule {}
export { Widget as DxWidgetComponent };
