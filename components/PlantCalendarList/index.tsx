import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UUID } from 'crypto';
import { getAllPlants } from '@/api/supabase/queries/plants';
import CONFIG from '@/lib/configs';
import COLORS from '@/styles/colors';
import { Flex } from '@/styles/containers';
import { H2, P1, P3 } from '@/styles/text';
import {
  DropdownOption,
  OwnedPlant,
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
import { Button } from '../Buttons';
import Icon from '../Icon';
import PlantCalendarRow from '../PlantCalendarRow';
import { PlantCalendarRowContainer } from '../PlantCalendarRow/styles';
import * as Styles from './styles';

interface PlantListProps {
  harvestSeasonFilterValue: DropdownOption<SeasonEnum>[];
  plantingTypeFilterValue: DropdownOption<PlantingTypeEnum>[];
  growingSeasonFilterValue: DropdownOption<SeasonEnum>[];
  usStateFilterValue: DropdownOption<string> | null;
  searchTerm: string;
  showMyPlants?: boolean;
  myPlantIds?: OwnedPlant[];
  clearFilters: () => void;
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
  showMyPlants = false,
  myPlantIds = [],
  clearFilters,
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
    let filtered = plants.filter(
      plant =>
        checkGrowingSeason(growingSeasonFilterValue, plant) &&
        checkHarvestSeason(harvestSeasonFilterValue, plant) &&
        checkPlantingType(plantingTypeFilterValue, plant) &&
        checkSearchTerm(searchTerm, plant) &&
        checkUsState(usStateFilterValue, plant),
    );

    if (showMyPlants) {
      const myPlantIdSet = new Set(myPlantIds.map(owned => owned.plant.id));
      filtered = filtered.filter(plant => myPlantIdSet.has(plant.id as UUID));
    }

    return filtered;
  }, [
    plants,
    growingSeasonFilterValue,
    harvestSeasonFilterValue,
    plantingTypeFilterValue,
    searchTerm,
    usStateFilterValue,
    showMyPlants,
    myPlantIds,
  ]);

  function handlePlantCalendarRowClick(plant: Plant) {
    router.push(`${CONFIG.generalPlant}/${plant.id}`);
  }

  function ErrorScreen({
    message,
    handleClick,
    buttonText,
  }: {
    message: string;
    handleClick: () => void;
    buttonText: string;
  }) {
    return (
      <Flex
        $direction="column"
        $textAlign="center"
        $justify="center"
        $w="240px"
        $align="center"
        $m="auto"
        $p="20px"
        $gap="8px"
        $h="60vh"
      >
        <Icon type="sprout"></Icon>
        <P1 $color={COLORS.midgray}>{message}</P1>
        <Button
          $primaryColor={COLORS.shrub}
          $width="170px"
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </Flex>
    );
  }

  return (
    <>
      {isLoaded ? (
        filteredPlantList.length === 0 ? (
          <ErrorScreen
            message="No matching plants"
            handleClick={clearFilters}
            buttonText="Clear Filters & Search"
          />
        ) : (
          <Styles.TableContainer>
            <Styles.StyledTable>
              {/* set widths of each columns*/}
              <colgroup>
                <col style={{ maxWidth: 'min-content' }} />
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
        )
      ) : (
        <Flex $justify="center" $align="center" $h="30rem">
          <H2>Loading...</H2>
        </Flex>
      )}
    </>
  );
};
