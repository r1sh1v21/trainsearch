const Train = require('../models/train');

function getStopIndex(train, station) {
  return train.stops.findIndex(
    s => s.station.toLowerCase() === station.toLowerCase()
  );
}

function calcDistance(train, fromIdx, toIdx) {
  let total = 0;
  for (let i = fromIdx + 1; i <= toIdx; i++) {
    total += train.stops[i].distanceFromPrev;
  }
  return total;
}

function toMins(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function calcPrice(distance) {
  return Math.round(distance * 1.25 * 100) / 100;
}

async function findRoutes(source, destination) {
  const trains = await Train.find({});
  const direct = [];
  const connecting = [];

  for (const train of trains) {
    const si = getStopIndex(train, source);
    const di = getStopIndex(train, destination);

    if (si === -1 || di === -1) continue;
    if (si >= di) continue;

    const distance = calcDistance(train, si, di);

    direct.push({
      type: 'direct',
      train: {
        trainNumber: train.trainNumber,
        trainName: train.trainName
      },
      from: source,
      to: destination,
      departure: train.stops[si].departure,
      arrival: train.stops[di].departure,
      distance,
      price: calcPrice(distance)
    });
  }

  for (const t1 of trains) {
    const si = getStopIndex(t1, source);
    if (si === -1) continue;

    for (let mi = si + 1; mi < t1.stops.length; mi++) {
      const mid = t1.stops[mi].station;
      const t1ArrivalMins = toMins(t1.stops[mi].departure);

      if (mid.toLowerCase() === destination.toLowerCase()) continue;

      for (const t2 of trains) {
        if (t2._id.equals(t1._id)) continue;

        const mi2 = getStopIndex(t2, mid);
        const di2 = getStopIndex(t2, destination);

        if (mi2 === -1 || di2 === -1) continue;
        if (mi2 >= di2) continue;

        const t2DepartureMins = toMins(t2.stops[mi2].departure);
        if (t2DepartureMins < t1ArrivalMins + 30) continue;

        const d1 = calcDistance(t1, si, mi);
        const d2 = calcDistance(t2, mi2, di2);
        const totalDistance = d1 + d2;

        connecting.push({
          type: 'connecting',
          totalDistance,
          totalPrice: calcPrice(totalDistance),
          transferStation: mid,
          waitTime: t2DepartureMins - t1ArrivalMins,
          leg1: {
            train: { trainNumber: t1.trainNumber, trainName: t1.trainName },
            from: source,
            to: mid,
            departure: t1.stops[si].departure,
            arrival: t1.stops[mi].departure,
            distance: d1,
            price: calcPrice(d1)
          },
          leg2: {
            train: { trainNumber: t2.trainNumber, trainName: t2.trainName },
            from: mid,
            to: destination,
            departure: t2.stops[mi2].departure,
            arrival: t2.stops[di2].departure,
            distance: d2,
            price: calcPrice(d2)
          }
        });
      }
    }
  }

  return [
    ...direct.sort((a, b) => a.price - b.price),
    ...connecting.sort((a, b) => a.totalPrice - b.totalPrice)
  ];
}

module.exports = { findRoutes };