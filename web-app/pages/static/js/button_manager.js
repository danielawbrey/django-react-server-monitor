function addFormElements() {
  let container = document.getElementById('data_chart_container');
  let childDiv = document.createElement("div");
  container.append(childDiv);

  let userInput = getUserInput();

  createLabel("Server Address", userInput[2] + ":" + userInput[3], childDiv);
  createLabel("Uptime", userInput[1], childDiv);
  createLabel("Metering", userInput[1], childDiv);
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

function createLabel(labelText, labelData, childDiv) {
  let webAddressLabel = document.createElement("label");
  webAddressLabel.innerHTML = labelText + ":" + labelData;
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

// function parseUserInput(userInputArr) {
//   let parsedInputArr = [], webpageDetailsSubarr = [];
//   for (let i = 0; i < userInputArr.length; i++) {
//     webpageDetailsSubarr.push(userInputArr[i]);
//     if(webpageDetailsSubarr.length % 4 == 0) {
//       parsedInputArr.push(webpageDetailsSubarr);
//       webpageDetailsSubarr = [];
//     }
//   }
//   return parsedInputArr;
// }

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
  const chart = new Chart(container, {
    type: 'line',
    options: {
      plugins: {
        // Change options for ALL axes of THIS CHART
        streaming: {
          duration: 20000
        }
      },
      scales: {
        xAxes: {
          type: 'realtime',
          realtime: {
            duration: 20000
          },
          scaleLabel: {
              display: true,
              labelString: 'Time (ms)'
          },
        }
      },
      yAxes: {
        scaleLabel: {
            display: true,
            labelString: 'Time (ms)'
        },
      },
    }
  });
  // new Chart(container, {
  //   type: 'line',
  //   data: {
  //     labels: [100, 200, 300, 400, 500],
  //     datasets: [{ 
  //         data: [86,114,106,106,107,111,133,221,483,278],
  //         label: "Africa",
  //         borderColor: "#3e95cd",
  //         fill: true
  //       }
  //     ]
  //   },
  //   options: {
  //     scales: {
  //       yAxes: [{
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'HTTP Status'
  //         }
  //       }],
  //       xAxes: [{
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'Time (ms)'
  //         }
  //       }]
  //     }
  //   }
  //   });
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