// window.onload = function() {
//   createLabel("Website");
//   let container = document.getElementById('chart');
//   drawChart(container);
//   // addGraphDeleteButton();
// };

function addFormElements() {
  // createLabel("Website");
  // createInput();

  // createLabel("Port");
  // createInput();

  createLabel("Website");
  createLabel("Uptime");
  createLabel("Metering");
  createLineGraph();
  addGraphDeleteButton();
  // createLabel("Website");
}

function createLabel(labelText) {
  let container = document.getElementById('data_chart_container');
  let webAddressLabel = document.createElement("label");
  webAddressLabel.innerHTML = labelText;
  container.append(webAddressLabel);
}

// function createInput() {
//   let container = document.getElementById('website_form');
//   let webAddressInput = document.createElement("input");
//   webAddressInput.setAttribute("type", "text");
//   container.append(webAddressInput);
// }

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

function addGraphDeleteButton() {
  let container = document.getElementById('data_chart_container');

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  container.append(deleteButton);
}

function createLineGraph() {
  let container = document.getElementById('data_chart_container');

  let chartDiv = document.createElement("div");
  container.append(chartDiv);

  let chartCanvas = document.createElement("canvas");
  chartDiv.append(chartCanvas);

  drawChart(chartCanvas);
}