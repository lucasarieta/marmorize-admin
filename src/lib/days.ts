export function getAllDaysInAWeek() {
  const days = [];

  for (let i = 0; i < 7; i++) {
    days.push(new Date(new Date().setDate(new Date().getDate() + i)));
  }

  return days;
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
