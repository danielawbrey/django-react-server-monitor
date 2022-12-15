function alertUser() {
  alert("Hello");
}

export { alertUser };
// function drawChart(container) {
//   container.height = 50;
//   const chart = new Chart(container, {
//     type: 'line',
//     options: {
//       plugins: {
//         streaming: {
//           duration: 20000
//         }
//       },
//       scales: {
//         xAxes: {
//           type: 'realtime',
//           realtime: {
//             duration: 20000
//           },
//         }
//       },
//     }
//   });
// }

// function createLineGraph(childDiv) {
//   let chartCanvas = document.createElement("canvas");
//   childDiv.append(chartCanvas);

//   drawChart(chartCanvas);
// }