let chart = NaN;

function addFormElements() {
  let container = document.getElementById('data_chart_container');
  let childDiv = document.createElement("div");
  container.append(childDiv);

  let userInput = getUserInput();

  createLabel("Server Address", childDiv);
  createLabel("Uptime", childDiv);
  createLabel("Metering", childDiv);
  // createTable("Metering", userInput[0], childDiv);
  createLineGraph(childDiv);
  addGraphDeleteButton(childDiv);
}

function onrefresh() {
  console.log("Refresh");
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
  // console.log(parseUserInput(userInputArr));
  httpGetAsync();
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
        alert(xmlHttp.status);
        plotData();
    }
  }
  xmlHttp.open("GET", "http://127.0.0.1:8002", false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function drawChart(container) {
  container.height = 50;
  chart = new Chart(container, {
    type: 'line',
    options: {
      plugins: {
        streaming: {
          duration: 2000
        }
      },
      scales: {
        xAxes: {
          type: 'realtime',
          realtime: {
            duration: 10000,
            onRefresh: function(chart) {
                console.log('Refresh');
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