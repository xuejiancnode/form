export * from "./lib/components";
export type * from "./lib/types"
import install from "./lib/default";
import {registerComponent} from "./lib/components/index";

export default {
  install,
  registerComponent
};