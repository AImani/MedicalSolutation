
export interface AuthModel {
  api_token: string
  refreshToken?: string
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export interface LoginRequestCommand {
  Username: string,
  Password: string
}

export interface BackOfficeAuthenticatedUserDto {
  FirstName: string,
  LastName: string,
  Username: string,
  NationalCode: string,
  JobTitle: string,
  Token?: TokenDto,
  SystemRoles: ReadonlyArray<SystemRoleDto>
}

export interface SystemRoleDto {
  Id: number;
  Name: string;
  Permissions: ReadonlyArray<PermissionDto>;
}

export interface TokenDto {
    Value: string,
    ExpiresIn:Date
}

export interface PermissionDto {
  Id: number;
  ControllerName: string;
  ActionName: string;
  ActionVerb: string;
  Description: string;
}

export interface AccessDto {
  ctrl: string;
  action: string;
  type?: string;
}

export interface IdentityUser {
  Id: string;
  UserName: string | null;
  Email: string | null;
  PhoneNumber: string | null;
  FirstName: string | null;
  LastName: string | null;
  FullName: string | null;
}