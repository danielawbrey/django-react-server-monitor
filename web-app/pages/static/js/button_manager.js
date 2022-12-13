let input_counter = 1;

window.onload = function() {
  create_line_graph();
};

function add_form_elements() {
  input_counter++;

  create_label("Website");
  create_input("website_address", input_counter);

  create_label("Port");
  create_input("website_port", input_counter);

  create_line_graph()
}

function create_label(label_text) {
  let container = document.getElementById('website_form');
  let web_address_label = document.createElement("label");
  web_address_label.innerHTML = label_text;
  container.append(web_address_label);
}

function create_input(input_type, input_counter) {
  let container = document.getElementById('website_form');
  let web_address_input = document.createElement("input");
  web_address_input.setAttribute("type", "text");
  container.append(web_address_input);
}

function start_test() {
  let user_input_arr = get_user_input();
  console.log(parse_user_input(user_input_arr));
}

function get_user_input() {
  let user_input = [];
  let container = document.getElementById('website_form');
  for (let i = 0; i < container.length; i++) {
    user_input.push(container.elements[i].value)
  }
  return user_input;
}

function parse_user_input(user_input_arr) {
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