import { checkWorkerGender, GenderEnum } from '../utils/checkWorkerGender';
import { saveWorkersOnStorage, checkIfWorkersWereLoaded } from '../utils/workersLocalStorage';

export interface IWorkerCard {
  name: string;
  image: string;
  id: number;
  gender: GenderEnum;
  profession: string;
}

export interface IGetWorkerOutput {
  data: IWorkerCard[],
  lastPageQueried: number
}

export async function getWorkers (page: number): Promise<IGetWorkerOutput | void> {
  const workersFromStorage = checkIfWorkersWereLoaded();
  if (workersFromStorage) {
    if (page === 1) {
      const objToReturn: IGetWorkerOutput = {
        data: workersFromStorage.workersData,
        lastPageQueried: workersFromStorage.lastPageLoaded
      }
      return objToReturn;
    }
    if (workersFromStorage.lastPageLoaded < page) {
      return await queryWorkersEndpoints(workersFromStorage.lastPageLoaded + 1);
    }
  } else {
    return await queryWorkersEndpoints(page)
  }
}

export function getLastQueriedPage (): number | void {
  const workersFromStorage = checkIfWorkersWereLoaded();
  if (workersFromStorage) {
    return workersFromStorage.lastPageLoaded;
  }
}

async function  queryWorkersEndpoints (page: number, previousWorkerData?: IWorkerCard[]): Promise<IGetWorkerOutput> {
  const apiUrl = `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`;
  const response = await fetch(apiUrl);
  const responseToJson = await response.json();
  const { results } = responseToJson;
  let mappedResults: IWorkerCard[] = results.map((worker: any) => {
    return {
      name: `${worker.first_name} ${worker.last_name}`,
      id: worker.id,
      profession: worker.profession,
      gender: checkWorkerGender(worker),
      image: worker.image
    } 
  })
  let objToSave: IWorkerCard[] = mappedResults;
  if (previousWorkerData) {
    objToSave = previousWorkerData.concat(mappedResults);
  }
  saveWorkersOnStorage(page, objToSave);
  return {
    data: mappedResults,
    lastPageQueried: page
  }
}
