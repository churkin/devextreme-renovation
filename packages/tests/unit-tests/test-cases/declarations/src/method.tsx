import {
  Component,
  ComponentBindings,
  OneWay,
  Ref,
  Method,
  JSXComponent,
  RefObject,
} from "@devextreme-generator/declarations";

function view(viewModel: Widget) {
  return <div ref={viewModel.divRef}></div>;
}

@ComponentBindings()
class WidgetInput {
  @OneWay() prop1?: number;
  @OneWay() prop2?: number;
}

@Component({
  view: view,
})
export default class Widget extends JSXComponent(WidgetInput) {
  @Ref() divRef!: RefObject<HTMLDivElement>;

  @Method()
  getHeight(p: number = 10, p1: any): string {
    return `${this.props.prop1} + ${this.props.prop2} + ${this.divRef.current?.innerHTML} + ${p}`;
  }

  @Method()
  getSize(): string {
    return `${this.props.prop1} + ${
      this.divRef.current?.innerHTML
    } + ${this.getHeight(0, 0)}`;
  }
}
