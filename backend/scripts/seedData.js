const mongoose = require('mongoose');
const Train = require('../models/train');
const Station = require('../models/station');
require('dotenv').config({ path: '../.env' });

// Pool of 60 Indian stations to pick from
const STATIONS = [
  'Chennai', 'Vellore', 'Bangalore', 'Mysuru', 'Mangalore',
  'Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Aurangabad',
  'Delhi', 'Jaipur', 'Agra', 'Lucknow', 'Kanpur',
  'Hyderabad', 'Vijayawada', 'Visakhapatnam', 'Tirupati', 'Guntur',
  'Kolkata', 'Bhubaneswar', 'Patna', 'Ranchi', 'Guwahati',
  'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar',
  'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode',
  'Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam',
  'Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain',
  'Chandigarh', 'Amritsar', 'Ludhiana', 'Shimla', 'Jammu',
  'Varanasi', 'Allahabad', 'Meerut', 'Bareilly', 'Aligarh',
  'Raipur', 'Bilaspur', 'Durg', 'Korba', 'Jagdalpur'
];

// ─── Helper Functions ───────────────────────────────────────────

// Pick N unique random items from an array
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// Add minutes to a "HH:MM" time string
// Returns new "HH:MM" string (wraps around midnight if needed)
function addMinutes(timeStr, minutes) {
  const [hours, mins] = timeStr.split(':').map(Number);
  const total = hours * 60 + mins + minutes;
  const newHours = Math.floor(total / 60) % 24;
  const newMins = total % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

// Generate a single train with random stops
function generateTrain(index) {
  // Number of stops: between 4 and 8
  const numStops = Math.floor(Math.random() * 5) + 4;

  // Pick random stations for this train's route
  const chosenStations = pickRandom(STATIONS, numStops);

  // Build the stops array
  let currentTime = `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`;

  const stops = chosenStations.map((station, i) => {
    if (i === 0) {
      // First stop — distance is 0, time is the random start time
      return {
        station,
        distanceFromPrev: 0,
        departure: currentTime
      };
    }

    // Each subsequent stop:
    // Distance from previous: random between 50 and 300 km
    const distance = Math.floor(Math.random() * 251) + 50;

    // Travel time roughly based on distance (avg 60-80 km/h)
    // So time taken = distance / speed * 60 minutes
    const speed = Math.floor(Math.random() * 21) + 60; // 60-80 km/h
    const travelMinutes = Math.floor((distance / speed) * 60);

    // Add a 5-15 min halt at each station
    const haltMinutes = Math.floor(Math.random() * 11) + 5;

    currentTime = addMinutes(currentTime, travelMinutes + haltMinutes);

    return {
      station,
      distanceFromPrev: distance,
      departure: currentTime
    };
  });

  return {
    trainNumber: `TRN${String(index + 1).padStart(4, '0')}`,  // TRN0001, TRN0002...
    trainName: `${chosenStations[0]} ${chosenStations[chosenStations.length - 1]} Express`,
    stops
  };
}

// ─── Main Seed Function ──────────────────────────────────────────

async function seed() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/traindb');
    console.log('✅ MongoDB connected');

    // 2. Clear existing data
    await Train.deleteMany({});
    await Station.deleteMany({});
    console.log('🗑️  Cleared existing trains and stations');

    // 3. Generate 1000 trains
    const trains = [];
    for (let i = 0; i < 1000; i++) {
      trains.push(generateTrain(i));
    }

    // 4. Insert all trains into DB
    await Train.insertMany(trains);
    console.log('✅ 1000 trains inserted');

    // 5. Collect all unique station names across all trains
    const allStationNames = new Set();
    trains.forEach(train => {
      train.stops.forEach(stop => {
        allStationNames.add(stop.station);
      });
    });

    // 6. Insert unique stations into Station collection
    const stationDocs = [...allStationNames].map(name => ({ name }));
    await Station.insertMany(stationDocs);
    console.log(`✅ ${stationDocs.length} stations inserted`);

    console.log('🎉 Seeding complete!');
    process.exit(0);   // exit cleanly

  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);   // exit with error
  }
}

// Run it
seed();