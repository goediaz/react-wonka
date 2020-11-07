import React from 'react';
import styles from './card.module.scss';
import { Link } from 'wouter';

interface Props {
  imgSrc: string;
  name: string;
  gender: string;
  profession: string;
  id: number;
}

const Card = (props: Props) => {
  return (
    <Link href={`/${props.id}`} className={styles.cardComponent}>
      <img src={props.imgSrc} alt="worker img" />
      <div className={styles.cardContent}>
      <h3>{props.name}</h3>
      <p>{props.gender}</p>
      <p>{props.profession}</p>
      </div>
  </Link>
  )
}

export default Card;