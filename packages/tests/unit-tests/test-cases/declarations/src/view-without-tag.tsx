import {
  Component,
  Slot,
  ComponentBindings,
  JSXComponent,
} from "@devextreme-generator/declarations";

function view(model: Widget): any {
  return model.props.children;
}

@ComponentBindings()
class WidgetInput {
  @Slot() children?: any;
}
@Component({
  view,
})
export default class Widget extends JSXComponent(WidgetInput) {}
