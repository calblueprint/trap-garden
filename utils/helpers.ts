export function processPlantMonth(month: string) {
  // If field is not null and starts with 'LATE' or 'EARLY,
  // get substring after 'LATE_ or 'EARLY_'
  if (!month) {
    return month;
  }

  if (month.startsWith('LATE')) {
    return month.substring(5);
  } else if (month.startsWith('EARLY')) {
    return month.substring(6);
  } else {
    return month;
  }
}
