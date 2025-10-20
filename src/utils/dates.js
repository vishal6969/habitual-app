export const getDayString = (day) => {
  if (isNaN(day)) return "";
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day];
};

export const getMonthString = (month) => {
  if (isNaN(month)) return "";
  return [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][month];
};
