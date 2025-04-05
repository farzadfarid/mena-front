export interface SpecialistRegisterModel {
    avatar: string; // base64 or binary string for image
    resume: string; // base64 or binary string for image
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    language: string;
    bankId: string;
    address: string;
    description: string;
    birthDate: string; // ISO 8601 format (e.g., "1990-01-01T00:00:00Z")
    serviceId: number;
    skillsId: number[]; // array of skill IDs
}


export interface LocalizedValue {
    values: {
        sv?: string;
        en?: string;
    };
}


export interface ServiceModel {
    id: number;
    name: LocalizedValue;
}

export interface SkillModel {
    id: number;
    serviceId: number;
    name: LocalizedValue;
}

export interface SpecialistModel {
    id: number;
    avatar: string;
    firstName: string;
    lastName: string;
    address: string;
    description: LocalizedValue;
    birthDate: string; // تاریخ رو به صورت ISO string می‌گیریم
    services: ServiceModel[];
    skills: SkillModel[];
}



