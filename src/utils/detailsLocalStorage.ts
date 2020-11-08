import { IWorkerDetails } from "../services/getWorkerInfo";

interface IExtendedWorkerDetails extends IWorkerDetails {
  loadedDate?: number
}

export function checkIfDetailsWasLoaded (id: string) {
  const getDetailsFromStorage = localStorage.getItem(`${id}`);
  if (getDetailsFromStorage) {
    const parsedDetailsFromStorage: IExtendedWorkerDetails = JSON.parse(getDetailsFromStorage);
    if (parsedDetailsFromStorage.loadedDate) {
      const checkIsDataIsOld = checkIfLoadedDateIsOlderThanADay(parsedDetailsFromStorage.loadedDate);
      if (!checkIsDataIsOld) {
        return deleteDateFromObj(parsedDetailsFromStorage)
      }
    }
  }
}

export function saveDetailsOnStorage (detailsData: IWorkerDetails, id: string): void {
  const detailsWithDate = setCurrentDateToDetailsObj(detailsData)
  localStorage.setItem(`${id}`, JSON.stringify(detailsWithDate));
}

function setCurrentDateToDetailsObj (obj: IWorkerDetails): IExtendedWorkerDetails {
  const copiedObj: IExtendedWorkerDetails = {...obj};
  copiedObj.loadedDate= new Date().getTime();
  return copiedObj;
}

function checkIfLoadedDateIsOlderThanADay (loadedDate: number): Boolean {
  const oneDay = new Date().getTime() + (24 * 60 * 60 * 1000);
  return oneDay < loadedDate ? true : false;
}

function deleteDateFromObj (obj: IExtendedWorkerDetails): IWorkerDetails {
  delete obj.loadedDate;
  return obj;
}