function ConnectingRouteCard({ route }) {
  return (
    <div style={styles.card}>
      <div style={styles.topRow}>
        <div style={styles.tag}>CONNECTING</div>
        <div style={styles.totalPrice}>Rs {route.totalPrice}</div>
      </div>

      <div style={styles.leg}>
        <div style={styles.legMeta}>
          <span style={styles.legLabel}>LEG 1</span>
          <span style={styles.trainNum}>{route.leg1.train.trainNumber}</span>
        </div>
        <div style={styles.name}>{route.leg1.train.trainName}</div>
        <div style={styles.journey}>
          <div>
            <div style={styles.time}>{route.leg1.departure}</div>
            <div style={styles.station}>{route.leg1.from}</div>
          </div>
          <div style={styles.line} />
          <div style={{ textAlign: 'right' }}>
            <div style={styles.time}>{route.leg1.arrival}</div>
            <div style={styles.station}>{route.leg1.to}</div>
          </div>
        </div>
        <div style={styles.subMeta}>{route.leg1.distance} KM · Rs {route.leg1.price}</div>
      </div>

      <div style={styles.transfer}>
        TRANSFER AT {route.transferStation.toUpperCase()} &nbsp;·&nbsp; {route.waitTime} MIN WAIT
      </div>

      <div style={styles.leg}>
        <div style={styles.legMeta}>
          <span style={styles.legLabel}>LEG 2</span>
          <span style={styles.trainNum}>{route.leg2.train.trainNumber}</span>
        </div>
        <div style={styles.name}>{route.leg2.train.trainName}</div>
        <div style={styles.journey}>
          <div>
            <div style={styles.time}>{route.leg2.departure}</div>
            <div style={styles.station}>{route.leg2.from}</div>
          </div>
          <div style={styles.line} />
          <div style={{ textAlign: 'right' }}>
            <div style={styles.time}>{route.leg2.arrival}</div>
            <div style={styles.station}>{route.leg2.to}</div>
          </div>
        </div>
        <div style={styles.subMeta}>{route.leg2.distance} KM · Rs {route.leg2.price}</div>
      </div>

      <div style={styles.footer}>
        <div style={styles.footerMeta}>TOTAL {route.totalDistance} KM</div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    padding: '2rem 2.5rem',
    marginBottom: '2px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    borderLeft: '3px solid #e0e0e0'
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  tag: {
    fontSize: '0.6rem',
    letterSpacing: '0.2em',
    fontWeight: '700',
    background: '#f0f0f0',
    color: '#888',
    padding: '3px 10px'
  },
  totalPrice: {
    fontSize: '1.5rem',
    fontWeight: '900',
    color: '#000',
    letterSpacing: '-1px'
  },
  leg: {
    marginBottom: '1rem'
  },
  legMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.2rem'
  },
  legLabel: {
    fontSize: '0.6rem',
    letterSpacing: '0.15em',
    color: '#ccc'
  },
  trainNum: {
    fontSize: '0.6rem',
    color: '#ccc',
    letterSpacing: '0.1em'
  },
  name: {
    fontSize: '0.85rem',
    fontWeight: '700',
    color: '#000',
    marginBottom: '1rem',
    letterSpacing: '-0.01em'
  },
  journey: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    marginBottom: '0.5rem'
  },
  time: {
    fontSize: '2rem',
    fontWeight: '900',
    color: '#000',
    letterSpacing: '-1.5px',
    lineHeight: 1
  },
  station: {
    fontSize: '0.65rem',
    color: '#999',
    marginTop: '0.3rem',
    letterSpacing: '0.1em'
  },
  line: {
    flex: 1,
    height: '1px',
    background: '#f0f0f0'
  },
  subMeta: {
    fontSize: '0.65rem',
    color: '#ccc',
    letterSpacing: '0.1em',
    marginBottom: '1.5rem'
  },
  transfer: {
    fontSize: '0.6rem',
    letterSpacing: '0.15em',
    color: '#aaa',
    borderTop: '1px dashed #eee',
    borderBottom: '1px dashed #eee',
    padding: '0.75rem 0',
    margin: '0.5rem 0 1.5rem',
    textAlign: 'center'
  },
  footer: {
    borderTop: '1px solid #f0f0f0',
    paddingTop: '1rem'
  },
  footerMeta: {
    fontSize: '0.65rem',
    color: '#ccc',
    letterSpacing: '0.15em'
  }
};

export default ConnectingRouteCard;