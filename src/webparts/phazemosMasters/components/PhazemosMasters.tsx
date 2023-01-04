import * as React from "react";
import styles from "./PhazemosMasters.module.scss";
import { IPhazemosMastersProps } from "./IPhazemosMastersProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { App } from "./App";
import "../../../ExternalRef/CSS/Style.css";
import { sp } from "@pnp/sp/presets/all";


export default class PhazemosMasters extends React.Component<
  IPhazemosMastersProps,
  {}
> {

  public constructor(props: IPhazemosMastersProps, {}) {
    super(props);
    sp.setup({
      sp: {
        baseUrl: this.props.siteUrl,
      },
    });
  }

  public render(): React.ReactElement<IPhazemosMastersProps> {
    return <App />;
  }
}
