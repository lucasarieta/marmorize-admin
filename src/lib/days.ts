function getDatesByDays(days: number) {
  const today = new Date();
  const _days = [];

  const todayBrasil = new Date(today.getTime() - 3 * 60 * 60 * 1000);

  for (let i = 0; i < days; i++) {
    const day = new Date(todayBrasil);
    day.setDate(todayBrasil.getDate() + i);
    _days.push(day);
  }

  return _days;
}

export function getDateRange(days: number = 7) {
  const daysInAWeek = getDatesByDays(days);

  const from = daysInAWeek[0].toISOString().split('T')[0];
  const to = daysInAWeek[daysInAWeek.length - 1].toISOString().split('T')[0];

  return {
    from: new Date(from),
    to: new Date(to),
  };
}

export function getDaysBetweenDates(from: Date, to: Date): Date[] {
  const daysInAWeek = [];

  const diffInMilliseconds = to.getTime() - from.getTime();
  const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  for (let i = 0; i <= days; i++) {
    const currentDay = new Date(from.getTime() + i * (1000 * 60 * 60 * 24));
    // GMT-3
    const adjustedCurrentDay = new Date(
      currentDay.getTime() + 3 * 60 * 60 * 1000
    );
    daysInAWeek.push(adjustedCurrentDay);
  }

  return daysInAWeek;
}

export function getDaysInString(days: Date[]): {
  currentDate: Date;
  text: string;
}[] {
  const list = [];

  for (let i = 0; i < days.length; i++) {
    list.push({
      currentDate: new Date(days[i]),
      text: days[i].toLocaleString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    });
  }

  return list;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export function isDayWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}
