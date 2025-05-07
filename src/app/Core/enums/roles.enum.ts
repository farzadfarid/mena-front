export enum RolesEnum {
    superadmin,
    specialist,
    admin,
    realcustomer,
    legalcustomer
}

export enum RolesEnumType {
    SuperAdmin = 'superadmin',
    Specialist = 'specialist',
    Admin = 'admin',
    RealCustomer = 'realcustomer',
    LegalCustomer = 'legalcustomer'
}
export type Role = `${RolesEnumType}`;