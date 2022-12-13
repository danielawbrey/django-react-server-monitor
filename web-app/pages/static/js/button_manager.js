  function alert_user() {
    let container = document.getElementById('website_form');

    let web_address_label = document.createElement("label");
    web_address_label.innerHTML = "Website";
    container.append(web_address_label);

    let web_address_input = document.createElement("input");
    web_address_input.setAttribute("type", "text");
    web_address_input.setAttribute("name", "FullName");
    container.append(web_address_input);

    let web_port_label = document.createElement("label");
    web_port_label.innerHTML = "Port";
    container.append(web_port_label);

    let web_port_input = document.createElement("input");
    web_port_input.setAttribute("type", "text");
    web_port_input.setAttribute("name", "FullName");
    container.append(web_port_input);

    create_line_graph()
}

function create_label() {}

function create_input() {}

function start_test() {
  alert('Button click')
}

function create_line_graph() {
  let container = document.getElementById('data_chart_container');

  let chart_div = document.createElement("div");
  container.append(chart_div);

  let chart_canvas = document.createElement("canvas");
  chart_canvas.height = 60;
  chart_div.append(chart_canvas);

  chart_div.append(chart_canvas);

  new Chart(chart_canvas, {
  type: 'line',
  data: {
    labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
    datasets: [{ 
        data: [86,114,106,106,107,111,133,221,783,2478],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false
      }, { 
        data: [282,350,411,502,635,809,947,1402,3700,5267],
        label: "Asia",
        borderColor: "#8e5ea2",
        fill: false
      }, { 
        data: [168,170,178,190,203,276,408,547,675,734],
        label: "Europe",
        borderColor: "#3cba9f",
        fill: false
      }, { 
        data: [40,20,10,16,24,38,74,167,508,784],
        label: "Latin America",
        borderColor: "#e8c3b9",
        fill: false
      }, { 
        data: [6,3,2,2,7,26,82,172,312,433],
        label: "North America",
        borderColor: "#c45850",
        fill: false
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