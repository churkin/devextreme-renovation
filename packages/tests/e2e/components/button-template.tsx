import {
  Component,
  ComponentBindings,
  JSXComponent,
  OneWay,
} from "@devextreme-generator/declarations";

function view(model: ButtonTemplate) {
  return <div style={{ backgroundColor: "#00aa00" }}>{model.props.text}</div>;
}

@ComponentBindings()
class Props {
  @OneWay() text?: string = "Click Me";
}

@Component({
  view,
})
export default class ButtonTemplate extends JSXComponent(Props) {}
