import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllPlants } from '@/api/supabase/queries/plants';
import { Flex } from '@/styles/containers';
import { H2, P3 } from '@/styles/text';
import {
  DropdownOption,
  Plant,
  PlantingTypeEnum,
  SeasonEnum,
} from '@/types/schema';
import {
  checkGrowingSeason,
  checkHarvestSeason,
  checkPlantingType,
  checkSearchTerm,
  checkUsState,
} from '@/utils/helpers';
import PlantCalendarRow from '../PlantCalendarRow';
import { PlantCalendarRowContainer } from '../PlantCalendarRow/styles';
import * as Styles from './styles';

interface PlantListProps {
  harvestSeasonFilterValue: DropdownOption<SeasonEnum>[];
  plantingTypeFilterValue: DropdownOption<PlantingTypeEnum>[];
  growingSeasonFilterValue: DropdownOption<SeasonEnum>[];
  usStateFilterValue: DropdownOption<string> | null;
  searchTerm: string;
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const MonthHeader = () => {
  return (
    <Styles.MonthsContainer>
      {months.map((month, index) => (
        <P3 key={index}>{month}</P3>
      ))}
    </Styles.MonthsContainer>
  );
};

export const PlantCalendarList = ({
  harvestSeasonFilterValue,
  plantingTypeFilterValue,
  growingSeasonFilterValue,
  usStateFilterValue,
  searchTerm,
}: PlantListProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const plantList = await getAllPlants();
      const alphabeticalPlantList = plantList.sort((a, b) =>
        a.plant_name.localeCompare(b.plant_name),
      );
      setPlants(alphabeticalPlantList);
      setIsLoaded(true);
    })();
  }, []);

  const filteredPlantList = useMemo(() => {
    return plants.filter(
      plant =>
        checkGrowingSeason(growingSeasonFilterValue, plant) &&
        checkHarvestSeason(harvestSeasonFilterValue, plant) &&
        checkPlantingType(plantingTypeFilterValue, plant) &&
        checkSearchTerm(searchTerm, plant) &&
        checkUsState(usStateFilterValue, plant),
    );
  }, [
    plants,
    growingSeasonFilterValue,
    harvestSeasonFilterValue,
    plantingTypeFilterValue,
    searchTerm,
    usStateFilterValue,
  ]);

  function handlePlantCalendarRowClick(plant: Plant) {
    router.push(`/plant-page/all-plants/${plant.id}`);
  }

  return (
    <>
      {isLoaded ? (
        <Styles.TableContainer>
          <Styles.StyledTable>
            {/* set widths of each columns*/}
            <colgroup>
              <col style={{ width: '72px' }} />
              <col style={{ minWidth: '400px' }} />
            </colgroup>
            <thead>
              <tr>
                <Styles.StickyTd></Styles.StickyTd>
                <Styles.ScrollableTd>
                  <MonthHeader />
                </Styles.ScrollableTd>
              </tr>
            </thead>
            <tbody>
              {filteredPlantList.map(plant => (
                <PlantCalendarRowContainer
                  key={plant.id}
                  onClick={() => handlePlantCalendarRowClick(plant)}
                >
                  <Styles.StickyTd>
                    <P3>{plant.plant_name}</P3>
                  </Styles.StickyTd>
                  <Styles.ScrollableTd>
                    <PlantCalendarRow
                      harvestStart={plant.harvest_start}
                      harvestEnd={plant.harvest_end}
                      transplantStart={plant.transplant_start}
                      transplantEnd={plant.transplant_end}
                      indoorsStart={plant.indoors_start}
                      indoorsEnd={plant.indoors_end}
                      outdoorsStart={plant.outdoors_start}
                      outdoorsEnd={plant.outdoors_end}
                    />
                  </Styles.ScrollableTd>
                </PlantCalendarRowContainer>
              ))}
            </tbody>
          </Styles.StyledTable>
        </Styles.TableContainer>
      ) : (
        <Flex $justify="center" $align="center" $h="30rem">
          <H2>Loading...</H2>
        </Flex>
      )}
    </>
  );
};
