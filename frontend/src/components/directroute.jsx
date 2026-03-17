
function DirectRouteCard({ route }) {
  return (
    <div style={styles.card}>
      <div style={styles.badge}>Direct</div>
      <div style={styles.trainName}>
        {route.train.trainName}
        <span style={styles.trainNumber}> #{route.train.trainNumber}</span>
      </div>
      <div style={styles.row}>
        <div style={styles.timeBlock}>
          <div style={styles.time}>{route.departure}</div>
          <div style={styles.station}>{route.from}</div>
        </div>
        <div style={styles.arrow}>──────►</div>
        <div style={styles.timeBlock}>
          <div style={styles.time}>{route.arrival}</div>
          <div style={styles.station}>{route.to}</div>
        </div>
      </div>
      <div style={styles.footer}>
        <span>📏 {route.distance} km</span>
        <span style={styles.price}>₹ {route.price}</span>
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
    borderLeft: '4px solid #0f3460'
  },
  badge: {
    display: 'inline-block',
    background: '#0f3460',
    color: 'white',
    padding: '2px 10px',
    borderRadius: '20px',
    fontSize: '0.75rem',
    marginBottom: '0.5rem'
  },
  trainName: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1a1a2e'
  },
  trainNumber: {
    fontWeight: 'normal',
    color: '#888',
    fontSize: '0.9rem'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem'
  },
  timeBlock: {
    textAlign: 'center'
  },
  time: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: '#1a1a2e'
  },
  station: {
    fontSize: '0.85rem',
    color: '#666'
  },
  arrow: {
    flex: 1,
    textAlign: 'center',
    color: '#aaa',
    fontSize: '1rem'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid #eee',
    paddingTop: '0.75rem',
    color: '#555'
  },
  price: {
    color: '#e94560',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  }
};

export default DirectRouteCard;