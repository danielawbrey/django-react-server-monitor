let chartArr = [];

class ServerChart {
  constructor(serverAddress, meteringTime) {
    this.serverAddress = serverAddress;
    this.meteringTime = meteringTime;
    this.chart = NaN;
  }

  colorDataPoints(statusCode) {
    const successfulHTTPResponseCode = 200;
    let bgColor = this.chart.data.datasets[0].pointBackgroundColor;
    let bColor = this.chart.data.datasets[0].pointBorderColor;
  
    if(statusCode != successfulHTTPResponseCode) {
      bgColor.push("#9e0f02");
      bColor.push("#9e0f02");
    }
    else {
      // bgColor = "#067800";
      bgColor.push('#067800');
      bColor.push('#067800');
    }
  }

  httpGetAsync() {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", this.serverAddress, false);
  
    xmlHttp.onerror = function() {
      console.log("Something went wrong");
    }
  
    xmlHttp.send(null);
    return xmlHttp.status;
  }

  computeLatency() {
    let startTime = new Date();
    this.colorDataPoints(this.httpGetAsync());
    let stopTime = new Date();

    return stopTime.getTime() - startTime.getTime();
  }

  setChartStatus(boolVal) {
    this.chart.options.plugins.streaming.pause = boolVal;
  }

  createLineGraph(childDiv) {
    let chartCanvas = document.createElement("canvas");
    childDiv.append(chartCanvas);
    this.drawChart(chartCanvas);
  }

  drawChart(container) {
    container.height = 50;
    this.chart = new Chart(container, {
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
              onRefresh: chart => {
                this.computeLatency();
                chart.data.datasets.forEach(dataset => {
                  dataset.data.push({
                    x: Date.now(),
                    y: Math.random()
                  });
                });
              }
              // onRefresh: function refresh(chart) {
              //   chart.data.datasets.forEach(function(dataset) {
              //     dataset.data.push({
              //       x: Date.now(),
              //       y: Math.random()
              //     });
              //   });
              // }
            },
          }
        },
      }
    });
  }
};

function addChart() {
  let container = document.getElementById('data_chart_container');
  let childDiv = document.createElement("div");
  container.append(childDiv);

  // document.getElementById("start_test_button").disabled = false;

  let userInput = getUserInput();

  chartArr.push(new ServerChart(`${userInput[2]}:${userInput[3]}`, userInput[1]));
  
  createLabel(`Server Address: ${userInput[2]}:${userInput[3]}`, 'server_address_label', childDiv);
  createLabel(`Uptime`, 'uptime_label', childDiv);
  createLabel(`Metering for ${userInput[1]} minutes`, 'metering_time_label', childDiv);
  chartArr[chartArr.length-1].createLineGraph(childDiv);
  addGraphDeleteButton(childDiv);
}

function addGraphDeleteButton(childDiv) {
  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.onclick = function(element) {
    removeElement(element);
  }
  childDiv.append(deleteButton);
}

function getUserInput() {
  let userInput = [];
  let container = document.getElementById('website_form');
  for (let i = 0; i < container.length; i++) {
    userInput.push(container.elements[i].value);
  }
  return userInput;
}

function createLabel(labelText, label_id, childDiv) {
  let webAddressLabel = document.createElement("label");
  webAddressLabel.setAttribute('id', label_id);
  webAddressLabel.innerHTML = labelText;
  childDiv.append(webAddressLabel);
}

function startTest() {
  let userInputArr = getUserInput();
  console.log(userInputArr);
  
  for(let i = 0; i < chartArr.length; i++) {
    chartArr[i].setChartStatus(false);
  }
  
  document.getElementById("start_test_button").disabled = true;
  document.getElementById("stop_test_button").disabled = false;

  setTimeout(function() { takeScreenshot(); }, 300000);
}

function stopTest() {
  for(let i = 0; i < chartArr.length; i++) {
    chartArr[i].setChartStatus(true);
  }
  document.getElementById("start_test_button").disabled = false;
  document.getElementById("stop_test_button").disabled = true;
}

function takeScreenshot() {
  html2canvas(document.body).then((canvas) => {
    let a = document.createElement("a");
    a.download = "ss.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
}

function removeElement(element) {
  let target = element.target;
  let parentDiv = target.parentElement;
  parentDiv.remove(target);
}