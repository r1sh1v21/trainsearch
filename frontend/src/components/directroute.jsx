function DirectRouteCard({ route }) {
  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <div style={styles.tag}>DIRECT</div>
        <div style={styles.trainNum}>{route.train.trainNumber}</div>
      </div>

      <div style={styles.name}>{route.train.trainName}</div>

      <div style={styles.journey}>
        <div>
          <div style={styles.time}>{route.departure}</div>
          <div style={styles.station}>{route.from}</div>
        </div>
        <div style={styles.line} />
        <div style={{ textAlign: 'right' }}>
          <div style={styles.time}>{route.arrival}</div>
          <div style={styles.station}>{route.to}</div>
        </div>
      </div>

      <div style={styles.footer}>
        <div style={styles.meta}>{route.distance} KM</div>
        <div style={styles.price}>Rs {route.price}</div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    padding: '2rem 2.5rem',
    marginBottom: '2px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.35rem'
  },
  tag: {
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    fontWeight: '700',
    color: '#000',
    background: '#000',
    color: '#fff',
    padding: '3px 10px'
  },
  trainNum: {
    fontSize: '0.65rem',
    color: '#bbb',
    letterSpacing: '0.1em'
  },
  name: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#000',
    marginBottom: '2rem',
    letterSpacing: '-0.02em'
  },
  journey: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  time: {
    fontSize: '2.5rem',
    fontWeight: '900',
    color: '#000',
    letterSpacing: '-2px',
    lineHeight: 1
  },
  station: {
    fontSize: '0.7rem',
    color: '#999',
    marginTop: '0.3rem',
    letterSpacing: '0.1em'
  },
  line: {
    flex: 1,
    height: '1px',
    background: '#e8e8e8'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '1.25rem'
  },
  meta: {
    fontSize: '0.65rem',
    color: '#bbb',
    letterSpacing: '0.15em'
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: '900',
    color: '#000',
    letterSpacing: '-1px'
  }
};

export default DirectRouteCard;