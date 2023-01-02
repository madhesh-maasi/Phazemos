import * as React from "react";
import styles from "./InviteUser.module.scss";
import { IInviteUserProps } from "./IInviteUserProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { App } from "./App";
import "../../../ExternalRef/CSS/Style.css";
export default class InviteUser extends React.Component<IInviteUserProps, {}> {
  public render(): React.ReactElement<IInviteUserProps> {
    return <App />;
  }
}
