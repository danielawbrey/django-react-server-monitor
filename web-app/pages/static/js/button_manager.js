let input_counter = 1;

window.onload = function() {
  let container = document.getElementById('chart');
  drawChart(container);
};

function addFormElements() {
  createLabel("Website");
  createInput("website_address");

  createLabel("Port");
  createInput("website_port");

  createLineGraph()
}

function createLabel(label_text) {
  let container = document.getElementById('website_form');
  let web_address_label = document.createElement("label");
  web_address_label.innerHTML = label_text;
  container.append(web_address_label);
}

function createInput(input_type) {
  let container = document.getElementById('website_form');
  let web_address_input = document.createElement("input");
  web_address_input.setAttribute("type", "text");
  container.append(web_address_input);
}

function startTest() {
  let user_input_arr = getUserInput();
  console.log(parseUserInput(user_input_arr));
  httpGetAsync();
}

function getUserInput() {
  let user_input = [];
  let container = document.getElementById('website_form');
  for (let i = 0; i < container.length; i++) {
    user_input.push(container.elements[i].value)
  }
  return user_input;
}

function parseUserInput(user_input_arr) {
  let parsed_input_arr = [], webpage_details_subarr = [];
  for (let i = 0; i < user_input_arr.length; i++) {
    webpage_details_subarr.push(user_input_arr[i]);
    if(webpage_details_subarr.length % 2 == 0) {
      parsed_input_arr.push(webpage_details_subarr);
      webpage_details_subarr = [];
    }
  }
  return parsed_input_arr;
}

function httpGetAsync(theUrl, callback) {
  let xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", "http://127.0.0.1:8002", false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

function drawChart(container) {
  container.height = 60;
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
      title: {
        display: true,
        text: 'World population per region (in millions)'
      }
    }
    });
}

function createLineGraph() {
  let container = document.getElementById('data_chart_container');

  let chart_div = document.createElement("div");
  container.append(chart_div);

  let chart_canvas = document.createElement("canvas");
  chart_div.append(chart_canvas);

  drawChart(chart_canvas);
}