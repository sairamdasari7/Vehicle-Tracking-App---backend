const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;

app.use(cors()); // To allow cross-origin requests

let currentIndex = 0;

const dummyData = require('./dummyData.json');

// Endpoint to fetch vehicle location
app.get('/api/vehicle-location', (req, res) => {
  if (currentIndex >= dummyData.today.length) {
    currentIndex = 0; // Loop back to the start
  }
  
  const currentData = dummyData.today[currentIndex];
  currentIndex++;

  // Send the response only once
  res.json(currentData);
});

// Endpoint to fetch the full route based on date
app.get('/api/location/:date', (req, res) => {
  const { date } = req.params;
  let selectedData = [];

  if (date === 'today') {
    selectedData = dummyData.today;
  } else if (date === 'yesterday') {
    selectedData = dummyData.yesterday;
  }

  if (selectedData.length === 0) {
    return res.status(404).json({ error: 'No data found for the selected date' });
  }

  // Send the selected data
  res.json(selectedData);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
