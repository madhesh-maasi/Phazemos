import * as React from "react";
import styles from "./InviteUser.module.scss";
import { IInviteUserProps } from "./IInviteUserProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { App } from "./App";
import "../../../ExternalRef/CSS/Style.css";

import { sp } from "@pnp/sp/presets/all";


export default class InviteUser extends React.Component<IInviteUserProps, {}> {

  public constructor(props: IInviteUserProps, {}) {
    super(props);
    sp.setup({
      sp: {
        baseUrl: this.props.siteUrl,
      },
    });

  }


  public render(): React.ReactElement<IInviteUserProps> {
    return (
      <App
        siteUrl={this.props.siteUrl}
        currentContext={this.props.currentContext}
        graphClient={this.props.graphClient}
      />
    );
  }
}
