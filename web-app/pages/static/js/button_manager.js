function addFormElements() {
  let container = document.getElementById('data_chart_container');
  let childDiv = document.createElement("div");
  container.append(childDiv);

  createLabel("Website", childDiv);
  createLabel("Uptime", childDiv);
  createLabel("Metering", childDiv);
  createLineGraph(childDiv);
  addGraphDeleteButton(childDiv);
}

function createLabel(labelText, childDiv) {
  let webAddressLabel = document.createElement("label");
  webAddressLabel.innerHTML = labelText;
  childDiv.append(webAddressLabel);
}

function startTest() {
  let userInputArr = getUserInput();
  console.log(parseUserInput(userInputArr));
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

function parseUserInput(userInputArr) {
  let parsedInputArr = [], webpageDetailsSubarr = [];
  for (let i = 0; i < userInputArr.length; i++) {
    webpageDetailsSubarr.push(userInputArr[i]);
    if(webpageDetailsSubarr.length % 2 == 0) {
      parsedInputArr.push(webpageDetailsSubarr);
      webpageDetailsSubarr = [];
    }
  }
  return parsedInputArr;
}

function httpGetAsync() {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
        alert(xmlHttp.status);
    }
  }
  xmlHttp.open("GET", "http://127.0.0.1:8002", false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function drawChart(container) {
  container.height = 50;
  new Chart(container, {
    type: 'line',
    data: {
      labels: [100, 200, 300, 400, 500],
      datasets: [{ 
          data: [86,114,106,106,107,111,133,221,483,278],
          label: "Africa",
          borderColor: "#3e95cd",
          fill: true
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'HTTP Status'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time (ms)'
          }
        }]
      }
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