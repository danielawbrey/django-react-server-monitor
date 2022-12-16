let chart = NaN;
let pauseData = true;

function setChartStatus(boolVal) {
  // pauseData = boolVal;
  chart.options.plugins.streaming.pause = boolVal;
}

function getChartStatus() {
  return pauseData;
}

function addFormElements() {
  let container = document.getElementById('data_chart_container');
  let childDiv = document.createElement("div");
  container.append(childDiv);

  document.getElementById("start_test_button").disabled = false;

  let userInput = getUserInput();

  createLabel("Server Address", childDiv);
  createLabel("Uptime", childDiv);
  createLabel("Metering", childDiv);
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
  // pauseData = true;
  setChartStatus(true);
  document.getElementById("start_test_button").disabled = false;
  document.getElementById("stop_test_button").disabled = true;
}

function getUserInput() {
  let userInput = [];
  let container = document.getElementById('website_form');
  for (let i = 0; i < container.length; i++) {
    userInput.push(container.elements[i].value)
  }
  return userInput;
}

function httpGetAsync() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
        console.log(xmlHttp.status);
    }
  }
  xmlHttp.open("GET", "http://127.0.0.1:8002", false);
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
        backgroundColor: "#e755ba",
        borderColor: "#e755ba",             // empty at the beginning
      }]
    },
    options: {
      plugins: {
        streaming: {
          duration: 2000,
          pause: getChartStatus(),
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
                  y: httpGetAsync()
                });
              });
            }
          },
        }
      },
    }
  });
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
  let target = element.target;
  let parentDiv = target.parentElement;
  parentDiv.remove(target);
}