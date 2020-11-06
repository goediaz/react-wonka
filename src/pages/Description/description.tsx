import React from 'react';
import styles from './description.module.scss';
import { DefaultParams, useRoute  } from "wouter";

interface Params extends DefaultParams {
  id: string;
}

const Description = () => {
  const [match, params] = useRoute<Params>("/:id");
  return (
    <div className={styles.descriptionContainer}>
      {params?.id}
    </div>
  )
}

export default Description;