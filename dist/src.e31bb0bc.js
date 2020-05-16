// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
// import "./styles.css";
let weeklyDistance = 40;
let splitA = 0.55,
    splitB = 0.65;
const weeklyDistanceInput = document.getElementById("weekly-distance-input"),
      weeklyDistanceValue = document.getElementById("weekly-distance-value");
weeklyDistanceInput.value = weeklyDistance;
weeklyDistanceValue.textContent = weeklyDistance;
weeklyDistanceInput.addEventListener("input", ({
  target
}) => {
  const {
    value
  } = target;
  weeklyDistance = value;
  weeklyDistanceValue.textContent = value;
  drawChart();
});
const splitAInput = document.getElementById("split-a-input"),
      splitAValue = document.getElementById("split-a-value");
splitAInput.value = splitA;
splitAValue.textContent = splitA;
splitAInput.addEventListener("input", ({
  target
}) => {
  const {
    value
  } = target;
  splitA = value;
  splitAValue.textContent = value;
  drawChart();
});
const splitBInput = document.getElementById("split-b-input"),
      splitBValue = document.getElementById("split-b-value");
splitBInput.value = splitB;
splitBValue.textContent = splitB;
splitBInput.addEventListener("input", ({
  target
}) => {
  const {
    value
  } = target;
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
  return [["Monday", 0], ["Tuesday", tuesdayDistance], ["Wednesday", 0], ["Thursday", thursdayDistance], ["Friday", 0], ["Saturday", saturdayDistance], ["Sunday", sundayDistance]];
}

function drawChart() {
  const dailyDistances = calculateDailyDistances(weeklyDistance);
  console.log(dailyDistances);
  const data = window.google.visualization.arrayToDataTable([["Day", "Distance", {
    role: "annotation"
  }], ...dailyDistances.map(([day, distance]) => [day, distance, distance])]);
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
    legend: {
      position: "none"
    },
    colors: ["#0000ff"],
    fontName: "Roboto Mono"
  };
  var chart = new window.google.visualization.ColumnChart(document.getElementById("chart_div"));
  chart.draw(data, options);
}

window.google.charts.load("current", {
  packages: ["corechart"]
});
window.google.charts.setOnLoadCallback(() => {
  document.getElementById("loader").classList.add("hidden");
  drawChart();
});

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
        args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

window.addEventListener("resize", debounce(() => {
  console.log("resize");
  drawChart();
}, 500));
},{}]},{},["index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map