export interface LocalizedValue {
  values: { [languageCode: string]: string };
}

export interface MoneyModel {
  value: number;
  currency: string;
}

export interface SkillModel {
  id: number;
  serviceId: number;
  name: LocalizedValue;
}

export interface SpecialistServiceModel {
  id: number;
  isEnable: boolean;
  name: LocalizedValue;
  fee: MoneyModel;
  skills: SkillModel[];
}
