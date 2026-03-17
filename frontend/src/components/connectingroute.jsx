function ConnectingRouteCard({ route }) {
  return (
    <div style={styles.card}>
      <div style={styles.badge}>Connecting</div>

      <div style={styles.leg}>
        <div style={styles.trainName}>
          {route.leg1.train.trainName}
          <span style={styles.trainNumber}> #{route.leg1.train.trainNumber}</span>
        </div>
        <div style={styles.row}>
          <div style={styles.timeBlock}>
            <div style={styles.time}>{route.leg1.departure}</div>
            <div style={styles.station}>{route.leg1.from}</div>
          </div>
          <div style={styles.arrow}>──────►</div>
          <div style={styles.timeBlock}>
            <div style={styles.time}>{route.leg1.arrival}</div>
            <div style={styles.station}>{route.leg1.to}</div>
          </div>
        </div>
        <div style={styles.legFooter}>📏 {route.leg1.distance} km · ₹{route.leg1.price}</div>
      </div>

      <div style={styles.transfer}>
        🔄 Transfer at {route.transferStation} · Wait {route.waitTime} mins
      </div>

      <div style={styles.leg}>
        <div style={styles.trainName}>
          {route.leg2.train.trainName}
          <span style={styles.trainNumber}> #{route.leg2.train.trainNumber}</span>
        </div>
        <div style={styles.row}>
          <div style={styles.timeBlock}>
            <div style={styles.time}>{route.leg2.departure}</div>
            <div style={styles.station}>{route.leg2.from}</div>
          </div>
          <div style={styles.arrow}>──────►</div>
          <div style={styles.timeBlock}>
            <div style={styles.time}>{route.leg2.arrival}</div>
            <div style={styles.station}>{route.leg2.to}</div>
          </div>
        </div>
        <div style={styles.legFooter}>📏 {route.leg2.distance} km · ₹{route.leg2.price}</div>
      </div>

      <div style={styles.footer}>
        <span>📏 Total {route.totalDistance} km</span>
        <span style={styles.price}>₹ {route.totalPrice}</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    borderLeft: '4px solid #e94560'
  },
  badge: {
    display: 'inline-block',
    background: '#e94560',
    color: 'white',
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    marginBottom: '0.5rem'
  },
  leg: {
    marginBottom: '0.75rem'
  },
  trainName: {
    fontSize: '1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#1a1a2e'
  },
  trainNumber: {
    fontWeight: 'normal',
    color: '#888',
    fontSize: '0.85rem'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '0.25rem'
  },
  timeBlock: {
    textAlign: 'center'
  },
  time: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#1a1a2e'
  },
  station: {
    fontSize: '0.8rem',
    color: '#666'
  },
  arrow: {
    flex: 1,
    textAlign: 'center',
    color: '#aaa'
  },
  legFooter: {
    fontSize: '0.85rem',
    color: '#888',
    marginTop: '0.25rem'
  },
  transfer: {
    background: '#fff8e1',
    border: '1px dashed #ffc107',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.85rem',
    color: '#888',
    marginBottom: '0.75rem',
    textAlign: 'center'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #eee',
    paddingTop: '0.75rem',
    color: '#555',
    marginTop: '0.5rem'
  },
  price: {
    color: '#e94560',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  }
};

export default ConnectingRouteCard;