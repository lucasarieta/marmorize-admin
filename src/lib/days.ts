export function getAllDaysInAWeek() {
  const today = new Date();
  const days = [];

  // Ajuste para GMT-3 (3 horas atrás)
  const todayBrasil = new Date(today.getTime() - 3 * 60 * 60 * 1000);

  for (let i = 0; i < 7; i++) {
    const day = new Date(todayBrasil);
    day.setDate(todayBrasil.getDate() + i);
    days.push(day);
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

export function formatDate(date: Date) {
  // Return the date in format "dd/mm/yyyy às hh:mm"
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
