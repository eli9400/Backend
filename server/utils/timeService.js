const currentTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const mints =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
  return { year, month, day, hour, mints, seconds };
};

const morganTime = () => {
  const { year, month, day, hour, mints, seconds } = currentTime();
  return `${year}/${month}/${day}-${hour}:${mints}:${seconds}`;
};

const morganDay = () => {
  const { year, month, day } = currentTime();
  return `${year}-${month}-${day}`;
};

exports.currentTime = currentTime;
exports.morganTime = morganTime;
exports.morganDay = morganDay;
