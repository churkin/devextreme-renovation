import {
  Component,
  ComponentBindings,
  JSXComponent,
  Effect,
  Template,
  ForwardRef,
} from "../../../component_declaration/common";

function view({
  props: { contentTemplate: Template },
  child,
}: ForwardRefTemplate) {
  return <Template childRef={child} />;
}

@ComponentBindings()
class Props {
  @Template() contentTemplate: any;
}

@Component({
  view,
})
export default class ForwardRefTemplate extends JSXComponent(Props) {
  @ForwardRef() child: HTMLDivElement;

  @Effect()
  effect() {
    this.child.style.backgroundColor = "rgb(120, 120, 120)";
  }
}