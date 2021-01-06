export interface IAgencyTypeModel {
    id: number;
    name: string;
}
export interface IAgencyModel {
    id: string;
    name: string;
    createDate: Date;
    ownerUserId: string;
    agencyTypeId: number;
    acronym: string;
    alias: string;
    typedAddressId?: number;
    type?: IAgencyTypeModel;
}
export interface ITypedAddressModel {
    id: number;
    road?: string;
    town?: string;
    province?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    line1?: string;
    line2?: string;
}
export interface IPropertyModel {
    id: string;
    agencyId: string;
    createdDate: Date;
    reference: string;
    archivedDate?: Date;
    inExclusivity: boolean;
    originalAgencyReference?: string;
    agency: IAgencyModel;
}
export interface ICultureModel {
    code: string;
    name: string;
}
export interface IUserAgencyModel {
    userId?: string;
    agencyId?: string;
}
export interface IUserModel {
    id: string;
    name: string;
    firstName?: string;
    lastName?: string;
    email: string;
    createdDate: Date;
    password: string;
    activeAgencyId?: string;
    activeAgency?: IAgencyModel;
    agencies?: IAgencyModel[];
}
export interface AdurcModels {
    agencyType: IAgencyTypeModel;
    agency: IAgencyModel;
    typedAddress: ITypedAddressModel;
    property: IPropertyModel;
    culture: ICultureModel;
    userAgency: IUserAgencyModel;
    user: IUserModel;
}
