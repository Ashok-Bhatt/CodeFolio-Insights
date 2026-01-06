const getStreaksAndActiveDays = (calendar) => {

  const allDates = Object.values(calendar)
    .flatMap(yearData => Object.keys(yearData))
    .sort((a, b) => new Date(a) - new Date(b));

  if (allDates.length === 0) {
    return { currentStreak: 0, maxStreak: 0, activeDays: 0, totalContributions: 0 };
  }

  let maxStreak = 0;
  let currentStreak = 0;
  let tempStreak = 0;
  const activeDays = allDates.filter((date)=>calendar[new Date(date).getFullYear()][date] > 0).length;
  const totalContributions = allDates.filter((date)=>calendar[new Date(date).getFullYear()][date] > 0).reduce((acc, date)=>acc + calendar[new Date(date).getFullYear()][date], 0);

  for (let i = 0; i < allDates.length; i++) {
    if (calendar[new Date(allDates[i]).getFullYear()][allDates[i]] > 0) {
      tempStreak++;
    } else {
      tempStreak = 0;
    }

    maxStreak = Math.max(maxStreak, tempStreak);
    if (new Date().toISOString().split('T')[0] === allDates[i]) {
      currentStreak = tempStreak;
    }
  }

  return {
    currentStreak,
    maxStreak,
    activeDays,
    totalContributions
  };
};

export {
    getStreaksAndActiveDays
}