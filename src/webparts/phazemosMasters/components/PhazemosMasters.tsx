import * as React from "react";
import styles from "./PhazemosMasters.module.scss";
import { IPhazemosMastersProps } from "./IPhazemosMastersProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { App } from "./App";
import "../../../ExternalRef/CSS/Style.css";
export default class PhazemosMasters extends React.Component<
  IPhazemosMastersProps,
  {}
> {
  public render(): React.ReactElement<IPhazemosMastersProps> {
    return <App />;
  }
}
