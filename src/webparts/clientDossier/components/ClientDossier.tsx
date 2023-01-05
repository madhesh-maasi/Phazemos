import * as React from "react";
import styles from "./ClientDossier.module.scss";
import { IClientDossierProps } from "./IClientDossierProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { App } from "./App";
import "../../../ExternalRef/CSS/Style.css";
import { sp } from "@pnp/sp/presets/all";

export default class ClientDossier extends React.Component<
  IClientDossierProps,
  {}
> {
  public constructor(props: IClientDossierProps, {}) {
    super(props);
    sp.setup({
      sp: {
        baseUrl: this.props.siteUrl,
      },
    });
  }

  public render(): React.ReactElement<IClientDossierProps> {
    return <App CurrentContext={this.props.currentContext} SiteUrl={this.props.siteUrl} />;
  }
}
