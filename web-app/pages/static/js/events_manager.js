import ServerChart from "./server_chart";

let chartArr = [];
let timeout = NaN;

function updateUptime() {
  let currentTime = new Date();
  for(let i = 0; i < chartArr.length; i++) {
    let label = document.getElementById(`uptime_label_${i+1}`);
    label.innerHTML =  `Uptime: ${chartArr[i].uptime} over ${(currentTime.getTime() - chartArr[i].startTime.getTime())/60000} minutes`
    currentTime = new Date();
  }
}

function addChart() {
  idCounter++;
  let container = document.getElementById('data_chart_container');
  let childDiv = document.createElement("div");
  container.append(childDiv);

  let userInput = getUserInput();

  var chart = new ServerChart(`${userInput[2]}:${userInput[3]}`, userInput[1], userInput[0]);

  createLabel(`Server Address: ${userInput[2]}:${userInput[3]}`, `server_address_label_${chart.idCounter}`, childDiv);
  createLabel(`Uptime`, `uptime_label_${chart.idCounter}`, childDiv);
  createLabel(`Metering for ${userInput[1]} minutes`, `metering_time_label_${chart.idCounter}`, childDiv);
  chartArr.push(chart);
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
  let label = document.createElement("label");
  label.setAttribute('id', label_id);
  label.innerHTML = labelText;
  childDiv.append(label);
}

function startTest() {
  testRunning = true;
  let userInputArr = getUserInput();
  console.log(userInputArr);
  
  for(let i = 0; i < chartArr.length; i++) {
    chartArr[i].setChartStatus(false);
  }
  
  document.getElementById("start_test_button").disabled = true;
  document.getElementById("stop_test_button").disabled = false;

  setTimeout(function() { updateUptime() }, 10);
}

function stopTest() {
  for(let i = 0; i < chartArr.length; i++) {
    chartArr[i].setChartStatus(true);
  }
  document.getElementById("start_test_button").disabled = false;
  document.getElementById("stop_test_button").disabled = true;
  clearTimeout(timeout);
}

function removeElement(element) {
  let target = element.target;
  let parentDiv = target.parentElement;
  parentDiv.remove(target);
}