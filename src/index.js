// import "./styles.css";

let weeklyDistance = 40;

let splitA = 0.55,
  splitB = 0.65;

const weeklyDistanceInput = document.getElementById("weekly-distance-input"),
  weeklyDistanceValue = document.getElementById("weekly-distance-value");

weeklyDistanceInput.value = weeklyDistance;
weeklyDistanceValue.textContent = weeklyDistance;

weeklyDistanceInput.addEventListener("input", ({ target }) => {
  const { value } = target;

  weeklyDistance = value;

  weeklyDistanceValue.textContent = value;

  drawChart();
});

const splitAInput = document.getElementById("split-a-input"),
  splitAValue = document.getElementById("split-a-value");

splitAInput.value = splitA;
splitAValue.textContent = splitA;

splitAInput.addEventListener("input", ({ target }) => {
  const { value } = target;

  splitA = value;

  splitAValue.textContent = value;

  drawChart();
});

const splitBInput = document.getElementById("split-b-input"),
  splitBValue = document.getElementById("split-b-value");

splitBInput.value = splitB;
splitBValue.textContent = splitB;

splitBInput.addEventListener("input", ({ target }) => {
  const { value } = target;

  splitB = value;

  splitBValue.textContent = value;

  drawChart();
});

function calculateDailyDistances(weeklyDistance) {
  const weekDistance = Math.round(weeklyDistance * (1 - splitA)),
    weekendDistance = weeklyDistance - weekDistance;

  const tuesdayDistance = Math.round(weekDistance * (1 - splitB)),
    thursdayDistance = weekDistance - tuesdayDistance,
    saturdayDistance = Math.round(weekendDistance * (1 - splitB)),
    sundayDistance = weekendDistance - saturdayDistance;

  return [
    ["Monday", 0],
    ["Tuesday", tuesdayDistance],
    ["Wednesday", 0],
    ["Thursday", thursdayDistance],
    ["Friday", 0],
    ["Saturday", saturdayDistance],
    ["Sunday", sundayDistance]
  ];
}

function drawChart() {
  const dailyDistances = calculateDailyDistances(weeklyDistance);

  console.log(dailyDistances);

  const data = window.google.visualization.arrayToDataTable([
    ["Day", "Distance", { role: "annotation" }],
    ...dailyDistances.map(([day, distance]) => [day, distance, distance])
  ]);

  var options = {
    title: "Daily Distances",
    hAxis: {
      title: "Day"
    },
    vAxis: {
      title: "Distance (km)"
    },
    width: "100%",
    height: 500,
    legend: { position: "none" },
    colors: ["#0000ff"],
    fontName: "Roboto Mono"
  };

  var chart = new window.google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );

  chart.draw(data, options);
}

window.google.charts.load("current", { packages: ["corechart"] });

window.google.charts.setOnLoadCallback(() => {
  document.getElementById("loader").classList.add("hidden");

  drawChart();
});

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

window.addEventListener(
  "resize",
  debounce(() => {
    console.log("resize");

    drawChart();
  }, 500)
);
