import React from 'react';
import { Plant } from '@/types/schema';
import styles from './PlantCardStyles.module.css';

export default function PlantCard({
  plantObj,
  canSelect,
}: {
  plantObj: Plant;
  canSelect: boolean;
}) {
  console.log(canSelect);
  return (
    <div className={styles.Card}>
      <div className={styles.CardPic}>
        <img alt={plantObj.plant_name}></img>
      </div>
      <div className={styles.cardContent}>
        <h2>{plantObj.plant_name}</h2>
        <div className={styles.plantAttributes}>
          <div className={styles.attribute}>
            {/* icon */}
            <p>{plantObj.harvest_start + ' - ' + plantObj.harvest_end}</p>
          </div>
          <div className={styles.attribute}>
            {/* icon */}
            <p>{plantObj.water_num_times_per_week + ' times / wk'}</p>
          </div>
          <div className={styles.attribute}>
            {/* icon */}
            <p>{plantObj.sunlight_required}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
