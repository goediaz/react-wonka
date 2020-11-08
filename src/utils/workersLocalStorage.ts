import { IWorkerCard } from "../services/getWorkers";

interface ILocalStorageWorkers {
  workersData: IWorkerCard[],
  lastPageLoaded: number,
  loadedDate?: number
}

export function checkIfWorkersWereLoaded (): ILocalStorageWorkers | void {
  const getWorkersFromStorage = localStorage.getItem('workersList');
  if (getWorkersFromStorage) {
    const parsedDetailsFromStorage: ILocalStorageWorkers = JSON.parse(getWorkersFromStorage);
    if (parsedDetailsFromStorage.loadedDate) {
      const checkIsDataIsOld = checkIfLoadedDateIsOlderThanADay(parsedDetailsFromStorage.loadedDate);
      if (!checkIsDataIsOld) {
        return parsedDetailsFromStorage
      }
    }
  }
}

export function saveWorkersOnStorage (page: number, workers: IWorkerCard[]) {
  const checkIfPreviousDataWasSaved = localStorage.getItem('workersList'); 
  var workersList: IWorkerCard[];
  if (checkIfPreviousDataWasSaved) {
    const parsedPreviousData: ILocalStorageWorkers = JSON.parse(checkIfPreviousDataWasSaved);
    workersList = parsedPreviousData.workersData.concat(workers)
  } else {
    workersList = workers
  }
  const objToBeSaved: ILocalStorageWorkers = {
    workersData: workersList,
    lastPageLoaded: page,
    loadedDate: new Date().getTime()
  }
  localStorage.setItem('workersList', JSON.stringify(objToBeSaved));
}

function checkIfLoadedDateIsOlderThanADay (loadedDate: number): Boolean {
  const oneDay = new Date().getTime() + (24 * 60 * 60 * 1000);
  return oneDay < loadedDate ? true : false;
}