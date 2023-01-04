export interface IInviteUserProps {
  description?: string;
  isDarkTheme?: boolean;
  environmentMessage?: string;
  hasTeamsContext?: boolean;
  userDisplayName?: string;

  
  siteUrl: string;
  currentContext: any;
  graphClient: any;

}
