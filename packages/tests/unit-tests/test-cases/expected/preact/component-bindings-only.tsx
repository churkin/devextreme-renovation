import { Options, AdditionalOptions } from "./types";

export declare type WidgetPropsType = {
  height?: number;
  data?: Options;
  info?: AdditionalOptions;
};
const WidgetProps: WidgetPropsType = {
  height: 10,
  data: { value: "" },
  info: { index: 0 },
};
export default WidgetProps;
