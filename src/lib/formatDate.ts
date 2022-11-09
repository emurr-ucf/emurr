export const formatUpdatedAt = (date: Date) => {
  const curr = new Date();
  if ((curr.getTime() - date.getTime()) / 1000 > 86400)
    return formatCreatedAt(date);

  const hour = date.getHours();
  const min = date.getMinutes();

  return `${hour === 0 ? 12 : hour > 12 ? hour - 12 : hour}:${
    min < 10 ? "0" + min : min
  } ${hour < 12 ? "AM" : "PM"}`;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatCreatedAt = (date: Date) => {
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};
