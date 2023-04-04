const newYearsDate = new Date("Jan 1, 2024 00:00:00").getTime();

const x = setInterval(function () {
  const nowDate = new Date().getTime();

  const distance = newYearsDate - nowDate;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = formatTime(days);
  document.getElementById("hours").innerHTML = formatTime(hours);
  document.getElementById("minutes").innerHTML = formatTime(minutes);
  document.getElementById("seconds").innerHTML = formatTime(seconds);

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  if (distance < 0) {
    clearInterval(x);
  }
}, 1000);
