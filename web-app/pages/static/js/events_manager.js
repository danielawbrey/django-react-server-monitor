let chart = NaN;
let chartArr = [];

function setChartStatus(boolVal) {
  for(let i = 0; i < chartArr.length; i++) {
    chartArr[i].options.plugins.streaming.pause = boolVal;
  }
}

function takeScreenshot() {
  html2canvas(document.body).then((canvas) => {
    let a = document.createElement("a");
    a.download = "ss.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
}

function addFormElements() {
  let container = document.getElementById('data_chart_container');
  let childDiv = document.createElement("div");
  container.append(childDiv);

  document.getElementById("start_test_button").disabled = false;

  let userInput = getUserInput();
  
  createLabel(`Server Address: ${userInput[2]}:${userInput[3]}`, childDiv);
  createLabel(`Uptime`, childDiv);
  createLabel(`Metering for ${userInput[1]} minutes`, childDiv);
  // createTable("Metering", userInput[0], childDiv);
  createLineGraph(childDiv);
  addGraphDeleteButton(childDiv);
}

function createTable(labelText, labelData, childDiv) {
  let webAddressLabel = document.createElement("table");

  let header = webAddressLabel.createTHead();
  let row = header.insertRow(0);

  let cell = NaN;

  let headerArr = ["Server Address", "Uptime", "Metering"];
  for(let i = 0; i < 3; i++) {
    cell = row.insertCell();
    cell.innerHTML = headerArr[i];
  }

  childDiv.append(webAddressLabel);
}

function createLabel(labelText, childDiv) {
  let webAddressLabel = document.createElement("label");
  webAddressLabel.innerHTML = labelText;
  childDiv.append(webAddressLabel);
}

function startTest() {
  let userInputArr = getUserInput();
  console.log(userInputArr);
  setChartStatus(false);
  // httpGetAsync();
  document.getElementById("start_test_button").disabled = true;
  document.getElementById("stop_test_button").disabled = false;
}

function stopTest() {
  setChartStatus(true);
  // takeScreenshot();
  document.getElementById("start_test_button").disabled = false;
  document.getElementById("stop_test_button").disabled = true;
}

function getUserInput() {
  let userInput = [];
  let container = document.getElementById('website_form');
  for (let i = 0; i < container.length; i++) {
    userInput.push(container.elements[i].value);
  }
  return userInput;
}

function computeLatency() {
  let startTime = new Date();
  let statusCode = httpGetAsync();
  let stopTime = new Date();

  colorDataPoints(statusCode);

  return stopTime.getTime() - startTime.getTime();
}

function colorDataPoints(statusCode) {
  const successfulHTTPResponseCode = 200;
  let bgColor = chart.data.datasets[0].pointBackgroundColor;
  let bColor = chart.data.datasets[0].pointBorderColor;

  if(statusCode != successfulHTTPResponseCode) {
    // bgColor = "#9e0f02";
    bgColor.push("#9e0f02");
    bColor.push("#9e0f02");
  }
  else {
    // bgColor = "#067800";
    bgColor.push('#067800');
    bColor.push('#067800');
  }
}

function httpGetAsync() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "http://127.0.0.1:8002", false);
  // xmlHttp.timeout = 500;

  // xmlHttp.ontimeout = function() {
  //   console.log('Timeout');
  // }

  xmlHttp.onerror = function() {
    console.log("Something went wrong");
  }

  let promise = new Promise((res, rej) => {
    setTimeout(() => res("Now it's done!"), 1000)
})

  
  xmlHttp.send(null);
  return xmlHttp.status;
}

function drawChart(container) {
  container.height = 50;
  chart = new Chart(container, {
    type: 'line',
    data: {
      datasets: [{
        data: [],
        label: "HTTP Status Codes",
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        pointBackgroundColor: ["#ffffff"],
        pointBorderColor: ["#ffffff"],           // empty at the beginning
      }]
    },
    options: {
      plugins: {
        streaming: {
          duration: 2000,
          pause: true,
        }
      },
      scales: {
        xAxes: {
          type: 'realtime',
          realtime: {
            duration: 10000,
            onRefresh: function(chart) {
              chart.data.datasets.forEach(function(dataset) {
                dataset.data.push({
                  x: Date.now(),
                  y: computeLatency()
                });
              });
            }
          },
        }
      },
    }
  });

  chartArr.push(chart);
}

function addGraphDeleteButton(childDiv) {
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.onclick = function(element) {
    removeElement(element);
  }
  childDiv.append(deleteButton);
}

function createLineGraph(childDiv) {
  let chartCanvas = document.createElement("canvas");
  childDiv.append(chartCanvas);
  drawChart(chartCanvas);
}

function removeElement(element) {
  setChartStatus(true);
  let target = element.target;
  let parentDiv = target.parentElement;
  parentDiv.remove(target);
}