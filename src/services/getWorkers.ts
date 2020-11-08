import { checkWorkerGender, GenderEnum } from '../utils/checkWorkerGender';

export interface IWorkerCard {
  name: string;
  image: string;
  id: number;
  gender: GenderEnum;
  profession: string;
}

export default async function getWorkers (page: number): Promise<IWorkerCard[]> {
  const apiUrl = `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${page}`;
  const response = await fetch(apiUrl);
  const responseToJson = await response.json();
  const { results } = responseToJson;
  const mappedResults: IWorkerCard[] = results.map((worker: any) => {
    return {
      name: `${worker.first_name} ${worker.last_name}`,
      id: worker.id,
      profession: worker.profession,
      gender: checkWorkerGender(worker),
      image: worker.image
    } 
  })
  return mappedResults;
}