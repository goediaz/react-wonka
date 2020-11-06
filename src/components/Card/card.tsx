import React from 'react';
import styles from './card.module.scss';

interface Props {
  imgSrc?: string;
  name: string;
  gender?: string;
  position?: string;
  id: string;
}

const Card = (props: Props) => {
  return (
    <div className={styles.cardComponent}>
      {props.name}
    </div>
  )
}

export default Card;