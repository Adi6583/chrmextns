const inputText = document.getElementById("inputText");
const wordCountEl = document.getElementById("wordCount");
const specialCharCountEl = document.getElementById("specialCharCount");
const numberCountEl = document.getElementById("numberCount");
const resetButton = document.getElementById("resetButton");
const chartElement = document.getElementById("chart");

// Ensure the chart is rendered only once
let chart;

inputText.addEventListener("input", () => {
  const text = inputText.value;

  const words = text.match(/\b\w+\b/g)?.length || 0;
  const specialChars = text.match(/[!@#$%^&*(),.?":{}|<>]/g)?.length || 0;
  const numbers = text.match(/\d/g)?.length || 0;

  // Update stat cards
  wordCountEl.textContent = words;
  specialCharCountEl.textContent = specialChars;
  numberCountEl.textContent = numbers;

  // Update chart
  updateChart(words, specialChars, numbers);
});

// Reset button functionality
resetButton.addEventListener("click", () => {
  inputText.value = "";
  wordCountEl.textContent = 0;
  specialCharCountEl.textContent = 0;
  numberCountEl.textContent = 0;

  // Reset chart
  updateChart(0, 0, 0);
});

function updateChart(words, specialChars, numbers) {
  if (chart) {
    // Only update the chart data if the chart exists
    chart.data.datasets[0].data = [words, specialChars, numbers];
    chart.update();
  } else {
    // Initialize the chart if it doesn't exist
    chart = new Chart(chartElement, {
      type: "doughnut",
      data: {
        labels: ["Words", "Special Characters", "Numbers"],
        datasets: [
          {
            label: "Text Analysis",
            data: [words, specialChars, numbers],
            backgroundColor: ["#3498db", "#e74c3c", "#f1c40f"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true, // Maintain the aspect ratio of the canvas
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }
}
