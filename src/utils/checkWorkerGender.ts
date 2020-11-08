export enum GenderEnum {
  Male = "Male",
  Female = "Female"
}

export function checkWorkerGender (worker: any): GenderEnum {
  if (worker.gender === 'M') {
    return GenderEnum.Male;
  } else {
    return GenderEnum.Female;
  }
}