export default class ServerChart {
  static chartID = 0;

  constructor(serverAddress, meteringTime, interval) {
    this.interval = interval;
    this.serverAddress = serverAddress;
    this.meteringTime = meteringTime;
    this.uptime = 0;
    this.chart = NaN;
    this.positiveResponse = 0;
    this.negativeResponse = 0;
    this.startTime = NaN;
    this.stopTime = NaN;
    chartID++;
  }

  colorDataPoints(statusCode) {
    const successfulHTTPResponseCode = 200;
    let bgColor = this.chart.data.datasets[0].pointBackgroundColor;
    let bColor = this.chart.data.datasets[0].pointBorderColor;
  
    if(statusCode != successfulHTTPResponseCode) {
      this.negativeResponse++;
      bgColor.push("#9e0f02");
      bColor.push("#9e0f02");
    }
    else {
      this.positiveResponse++;
      bgColor.push('#067800');
      bColor.push('#067800');
    }

    this.uptime = (this.positiveResponse / (this.positiveResponse + this.negativeResponse)).toFixed(3);
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
    this.startTime = new Date();
    this.colorDataPoints(this.httpGetAsync());
    let stopTime = new Date();

    let currentTime = new Date();

    return stopTime.getTime() - this.startTime.getTime();
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
            duration: parseInt(this.interval,10)*1000,
            pause: true,
          }
        },
        scales: {
          xAxes: {
            type: 'realtime',
            realtime: {
              duration: 10000,
              onRefresh: chart => {
                let latency = this.computeLatency();
                chart.data.datasets.forEach(dataset => {
                  dataset.data.push({
                    x: Date.now(),
                    y: latency
                  });
                });
              }
            },
          }
        },
      }
    });
  }
};