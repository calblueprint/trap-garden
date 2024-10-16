import React from 'react';
import { Plant } from '@/types/schema';
import styles from './PlantCardStyles.module.css';

export default function PlantCard({ plant }: { plant: Plant }) {
  return (
    <div className={styles.Card}>
      <div className={styles.CardPic}>
        <img alt={plant.plant_name}></img>
      </div>
      <div className={styles.CardContent}>
        <h2>{plant.plant_name}</h2>
        <div className={styles.PlantAttributes}>
          <div className={styles.Attribute}>
            {/* icon */}
            <p>{plant.harvest_start + ' - ' + plant.harvest_end}</p>
          </div>
          <div className={styles.Attribute}>
            {/* icon */}
            <p>{plant.water_num_times_per_week + ' times / wk'}</p>
          </div>
          <div className={styles.Attribute}>
            {/* icon */}
            <p>{plant.sunlight_required}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
