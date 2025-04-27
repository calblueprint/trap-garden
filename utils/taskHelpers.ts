import dayjs from 'dayjs';
import { mapMonthToSeason } from './helpers';

export function isOlderThanFreqeuncyOrNull(
  date: string | null,
  frequency: number,
): boolean {
  if (date == null) return true;
  const givenDate = new Date(date);
  const currentDate = new Date();
  const threshold = frequency == 7 ? 3 : 7;
  // Subtract the frequency from the current date because we want to show task after frequency days again
  currentDate.setDate(currentDate.getDate() - threshold);
  return givenDate < currentDate;
}
// export function isOlderThanWateringFrequencyOrNull(
//   date: string | null,
// ): boolean {
//   if (date == null) return true;
//   const givenDate = new Date(date);
//   const currentDate = new Date();
//   // Subtract 3 days from the current date because we want to show watering task after 3 days again
//   currentDate.setDate(currentDate.getDate() - 3);
//   return givenDate < currentDate;
// }

// export function isOlderThanWeedingFrequencyOrNull(
//   weeding_frequency: string,
//   last_weeded_date: string | null,
// ): boolean {
//   if (!last_weeded_date) return true; // check null too
//   const givenDate = new Date(last_weeded_date);
//   const currentDate = new Date();
//   // Subtract 3 or 7 days from the current date because we want to show task after 3 or 7 days again
//   const threshold = weeding_frequency === 'Weekly' ? 3 : 7;
//   currentDate.setDate(currentDate.getDate() - threshold);
//   return givenDate < currentDate;
// }

// Determine the current season using the provided map.
export function getCurrentSeason() {
  const now = new Date();
  const monthName = now
    .toLocaleString('en-US', { month: 'long' })
    .toUpperCase();
  return mapMonthToSeason(monthName);
}

// Return true if the recent harvest date falls in the current harvest window.
export function isHarvestedThisSeason(
  recent: Date,
  current: Date,
  harvestSeason: string,
): boolean {
  const monthNameCurrent = current
    .toLocaleString('en-US', { month: 'long' })
    .toUpperCase();
  const currentSeason = mapMonthToSeason(monthNameCurrent);
  if (harvestSeason !== currentSeason) {
    return false;
  }
  // For non-WINTER seasons, require same calendar year.
  if (harvestSeason !== 'WINTER') {
    return recent.getFullYear() === current.getFullYear();
  } else {
    // For WINTER, handle December, January, and February.
    const currentMonth = current.getMonth(); // 0-indexed: January = 0, February = 1, December = 11
    if (currentMonth === 0 || currentMonth === 1) {
      // January or February
      // Accept if recent harvest was in January or February of the current year, or in December of previous year.
      return (
        (recent.getFullYear() === current.getFullYear() &&
          (recent.getMonth() === 0 || recent.getMonth() === 1)) ||
        (recent.getFullYear() === current.getFullYear() - 1 &&
          recent.getMonth() === 11)
      );
    } else if (currentMonth === 11) {
      // December
      // Only accept if the harvest was in December of the current year.
      return (
        recent.getFullYear() === current.getFullYear() &&
        recent.getMonth() === 11
      );
    }
    // This fallback shouldn't be reached if all WINTER months are covered
    return recent.getFullYear() === current.getFullYear();
  }
}

export function computeDueDate(
  lastTaskDate: Date | null,
  interval: number,
): Date {
  const candidateDueDate = new Date();
  if (lastTaskDate) {
    // candidateDueDate = new Date(lastTaskDate);
    const dayJsDueDate = dayjs(lastTaskDate).utc();
    candidateDueDate.setDate(dayJsDueDate.date() + interval);
  } else {
    const dayJsDueDate = dayjs().utc();
    candidateDueDate.setDate(dayJsDueDate.date() + interval);
  }
  return candidateDueDate;
}
