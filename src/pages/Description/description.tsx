import React, { useEffect, useState } from 'react';
import styles from './description.module.scss';
import { DefaultParams, useRoute  } from "wouter";
import getWorkerInfo, { IWorkerDetails } from '../../services/getWorkerInfo';
import ReactHtmlParser from 'react-html-parser';
import Spinner from '../../components/Spinner/spinner';
 

interface Params extends DefaultParams {
  id: string;
}

const Description = () => {
  const [match, params] = useRoute<Params>("/:id");
  const [workerDetails, setWorkerDetails] = useState<IWorkerDetails>({} as IWorkerDetails);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [])

  const fetchData = async () => {
    const workerData = await getWorkerInfo(params?.id);
    setWorkerDetails(workerData)
    setIsLoading(false);
  }

  return (
    <section className={styles.descriptionContainer}>
      {
        isLoading ?
        <Spinner /> : 
        <>
          <div className={styles.leftContainer}>
            <img src={workerDetails.image} alt='worker' />
          </div>
          <div className={styles.rightContainer}>
            <h3>{workerDetails.name}</h3>
            <p className={styles.detailsText}>{workerDetails.gender}</p>
            <p className={styles.detailsText}>{workerDetails.profession}</p>
            <div className={styles.workerDescription}>
              {ReactHtmlParser(workerDetails.description)}
            </div>
          </div>
        </>
      }
    </section>
  )
}

export default Description;