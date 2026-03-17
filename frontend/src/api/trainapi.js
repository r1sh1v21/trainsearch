import axios from 'axios';

const base = 'http://localhost:5000/api';

export async function getStations() {
  const res = await axios.get(`${base}/stations`);
  return res.data;
}

export async function searchTrains(from, to) {
  const res = await axios.get(`${base}/search`, {
    params: { from, to }
  });
  return res.data;
}