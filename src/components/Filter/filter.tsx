import React, { useState, useEffect } from 'react';
import styles from './filter.module.scss';
import { IWorkerCard } from "../../services/getWorkers";
import search from '../../assets/images/search.png';
import { ILocalStorageWorkers } from '../../utils/workersLocalStorage';

interface Props {
  callback: (filteredWorkers: IWorkerCard[]) => void
}

const Filter = (props: Props) => {
  const [filterValue, setFilterValue] = useState<string>('');
  const [availableWorkers, setAvailableWorkers] = useState<IWorkerCard[]>([]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setFilterValue(event.target.value);
    if (!inputValue) {
      props.callback([])
    }
  }

  const handleFocus = () => {
    const savedWorkers = localStorage.getItem('workersList');
    if (savedWorkers) {
      const parsedWorkers: ILocalStorageWorkers = JSON.parse(savedWorkers);
      setAvailableWorkers(parsedWorkers.workersData);
    } 
  }

  useEffect(() => {
    if (filterValue) {
      applyFilter();
    }
  }, [filterValue])

  const applyFilter = () => {
    const filteredResults: IWorkerCard[] = [];
    availableWorkers.forEach((worker) => {
      if (worker.name.includes(filterValue)) {
        filteredResults.push(worker);
      }
      if (worker.profession.includes(filterValue)) {
        filteredResults.push(worker);
      }
    });
    props.callback(filteredResults);
  }

  return (
    <div className={styles.filterComponent}>
      <div className={styles.filterContainer}>
        <input onFocus={handleFocus} onChange={handleFilterChange} value={filterValue} placeholder="Search" />
        <img src={search} alt="search icon" />
      </div>
    </div>
  )
}

export default Filter;