import dayjs from "dayjs";

export function getStaticEvents(title, weekday) {
  let selectWeekday = dayjs().day(weekday);
  const currentYear = dayjs().year();
  const list = [];

  while (selectWeekday.year() === currentYear) {
    list.push({
      title,
      start: selectWeekday.format(),
    });
    selectWeekday = selectWeekday.add(7, "day");
  }

  return list;
}
