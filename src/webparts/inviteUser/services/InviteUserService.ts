import { IInviteUserProps } from "../components/IInviteUserProps";
import { sp } from "@pnp/sp/presets/all";

export default class InviteUserService {

    private _userDetails: string = "User Details";

    inviteNewUser = (props: IInviteUserProps) => {
        var userData = {
            CompanyName: "CompanyName",
            UserEmailID: "vinoth@technorucs.com",
        };
        sp.web.lists
            .getByTitle(this._userDetails)
            .items.add(userData)
            .then((res: any) => {
                var graphProperty = {
                    CompanyName: userData.CompanyName,
                    UserEmailID: userData.UserEmailID,
                    InviteRedirectUrl: "https://chandrudemo.sharepoint.com/",
                };
                this.graphCallToInviteUser(props, graphProperty);
            });
    };

    graphCallToInviteUser = (props: IInviteUserProps, graphProperty: any) => {
        var inviteData = {
            invitedUserEmailAddress: graphProperty.UserEmailID,
            sendInvitationMessage: true,
            inviteRedirectUrl: graphProperty.InviteRedirectUrl
        };

        props.graphClient
            .api("/invitations")
            .post(inviteData)
            .then((content: any) => {
                alert("Invitation sent successfully.");
            })
            .catch((err: any) => {
                alert(err);
            });
    };
}