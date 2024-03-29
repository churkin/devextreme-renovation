export const dynamicComponentDirective = ` 
@Directive({
  selector: '[dynamicComponent]',
})
export class DynamicComponentDirective {
  private _props: { [name: string]: any } = {};
  get props(): { [name: string]: any }{
    return this._props
  }
  @Input() set props(value: { [name: string]: any }) { 
    this._props = Object.keys(value).reduce((result: {[name: string]: any}, key)=>{
      if(key.indexOf("dxSpreadProp")===0){
        return {
          ...result,
          ...value[key]
        }
      }
      return {
        ...result,
        [key]: value[key],
      };
    }, {});
  }
  @Input() componentConstructor: any;

  private component: any;
  private subscriptions: {[name:string]:(e: any)=>void} = {};

  private childView?: EmbeddedViewRef<any>;

  constructor(
    public viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  renderChildView(model: any = {}){
    const childView = this.templateRef.createEmbeddedView(model);
    childView.detectChanges();
    return childView;
  }

  ngAfterViewChecked(){
    this.updateDynamicComponent();
  }

  updateDynamicComponent(){
    const component = this.component;
    if(component){
      let updated = false;
      Object.keys(this.props).forEach(prop=>{
        const value = this.props[prop];
        if(component[prop]!==value){
          if(component[prop] instanceof EventEmitter){
            this.subscriptions[prop] = value;
          } else{
            component[prop] = value;
            updated = true;
          }
        }
      });
      updated && component.changeDetection.detectChanges();
    }
  }

  createSubscriptions(){
    const component = this.component;
    Object.keys(this.props).forEach(prop=>{
      if(component[prop] instanceof EventEmitter){
        component[prop].subscribe((e: any)=>{
          this.subscriptions[prop]?.(e);
        })
      }
    });
  }

  createComponent(model: any){
    if (this.component) {
      this.childView?.detectChanges();
      return;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componentConstructor);
    this.viewContainerRef.clear();
    const childView = this.renderChildView(model);
    const component = this.viewContainerRef.createComponent<any>(
        componentFactory,
        0,
        undefined,
        [childView.rootNodes]
      ).instance;

    this.component = component;
    if (childView.rootNodes.length) { 
      this.childView = childView;
    }

    this.createSubscriptions();
    this.updateDynamicComponent();
  }
}`;

export const dynamicComponentDirectiveCoreImports = [
  'Directive',
  'ViewContainerRef',
  'Input',
  'TemplateRef',
  'ComponentFactoryResolver',
  'EmbeddedViewRef',
];
