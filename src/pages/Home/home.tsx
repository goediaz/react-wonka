import React, { useState } from 'react';
import styles from './home.module.scss';
import ListOfWorkers from '../../components/ListOfWorkers/listOfWorkers';
import Filter from '../../components/Filter/filter';
import { IWorkerCard } from "../../services/getWorkers";

const Home = () => {
  const [workersFromFilter, setWorkersFromFilter] = useState<IWorkerCard[]>();
  const [isFiltering, setIsFiltering] = useState<boolean>(false);

  const filterCallback = (filteredWorkers: IWorkerCard[], isFiltering: boolean): void => {
    setWorkersFromFilter(filteredWorkers);
    setIsFiltering(isFiltering);
  }

  return (
    <section className={styles.homeContainer}>
      <Filter callback={filterCallback} />
      <header className={styles.homeHeader}>
        <h2>Find your Oompa Loompa</h2>
        <h3>There are more than 100k</h3>
      </header>
      <ListOfWorkers workersFromFilter={workersFromFilter} isFiltering={isFiltering} />
    </section>
  )
}

export default Home;