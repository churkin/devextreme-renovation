import {
  Component,
  ComponentBindings,
  JSXComponent,
} from "@devextreme-generator/declarations";
import WidgetWithTemplate from "./dx-widget-with-template";
import InnerWidget from "./dx-inner-widget";

const CustomTemplate = ({ text }: { text: string; value: number }) => {
  return <span>{text}</span>;
};

function view(model: Widget) {
  return (
    <WidgetWithTemplate
      template={CustomTemplate}
      componentTemplate={InnerWidget}
      arrowTemplate={(data: { name: string; id: number }) => (
        <div>{data.name}</div>
      )}
    />
  );
}

@ComponentBindings()
export class WidgetProps {}

@Component({
  view: view,
})
export default class Widget extends JSXComponent(WidgetProps) {}
