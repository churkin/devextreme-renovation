import {
  InfernoEffect,
  BaseInfernoComponent,
  InfernoComponent,
  InfernoWrapperComponent,
  normalizeStyles,
} from "@devextreme/vdom";

export declare type SomePropsType = {};
const SomeProps: SomePropsType = {};
function view() {
  return <span></span>;
}

import { createElement as h } from "inferno-compat";
declare type RestProps = {
  className?: string;
  style?: { [name: string]: any };
  key?: any;
  ref?: any;
};

export class InheritedFromInfernoComponent extends InfernoComponent<any> {
  state: { _hovered: Boolean };

  refs: any;

  constructor(props: any) {
    super(props);
    this.state = {
      _hovered: false,
    };
    this.someEffect = this.someEffect.bind(this);
  }

  _hovered!: Boolean;

  createEffects() {
    return [new InfernoEffect(this.someEffect, [])];
  }
  updateEffects() {
    this._effects[0]?.update([]);
  }

  someEffect(): any {}
  get someGetter(): any {
    return this.state._hovered;
  }
  get restAttributes(): RestProps {
    const { ...restProps } = this.props as any;
    return restProps;
  }

  render() {
    const props = this.props;
    return view();
  }
}

InheritedFromInfernoComponent.defaultProps = SomeProps;
