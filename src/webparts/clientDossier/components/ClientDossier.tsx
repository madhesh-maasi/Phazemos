import * as React from "react";
import styles from "./ClientDossier.module.scss";
import { IClientDossierProps } from "./IClientDossierProps";
import { escape } from "@microsoft/sp-lodash-subset";
import App from "./App";
import "../../../ExternalRef/CSS/Style.css";
export default class ClientDossier extends React.Component<
  IClientDossierProps,
  {}
> {
  public render(): React.ReactElement<IClientDossierProps> {
    return <App />;
  }
}
