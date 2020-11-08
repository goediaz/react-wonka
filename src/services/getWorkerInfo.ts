import { checkWorkerGender, GenderEnum } from '../utils/checkWorkerGender';
import { checkIfDetailsWasLoaded, saveDetailsOnStorage } from '../utils/detailsLocalStorage';

export interface IWorkerDetails {
  name: string;
  image: string;
  gender: GenderEnum;
  profession: string;
  description: string;
}

export default async function getWorkerInfo (id: string): Promise<IWorkerDetails> {
  const detailsFromStorage = checkIfDetailsWasLoaded(id);
  if (detailsFromStorage) {
    return detailsFromStorage;
  } else {
    const apiUrl = `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`;
    const response = await fetch(apiUrl);
    const workerJson = await response.json();
    const mappedResults: IWorkerDetails = {
      name: `${workerJson.first_name} ${workerJson.last_name}`,
      profession: workerJson.profession,
      gender: checkWorkerGender(workerJson),
      image: workerJson.image,
      description: workerJson.description
    }
    saveDetailsOnStorage(mappedResults, id);
    return mappedResults;
  }
}