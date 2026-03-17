import { useState, useRef, useEffect } from 'react';

function Dropdown({ value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', flex: 1, minWidth: '160px' }}>
      <div
        style={{
          borderBottom: '1px solid #333',
          padding: '0.6rem 0',
          color: value ? '#fff' : '#555',
          fontSize: '1.1rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
        }}
        onClick={() => setOpen(o => !o)}
      >
        <span>{value || placeholder}</span>
        <span style={{ fontSize: '0.6rem', color: '#555' }}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#111',
          maxHeight: '220px',
          overflowY: 'auto',
          zIndex: 100,
          border: '1px solid #222'
        }}>
          {options.map(s => (
            <div
              key={s._id}
              onClick={() => { onChange(s.name); setOpen(false); }}
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.9rem',
                color: value === s.name ? '#000' : '#fff',
                background: value === s.name ? '#fff' : 'transparent',
                cursor: 'pointer',
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
              }}
            >
              {s.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchBar({ stations, onSearch, loading }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [error, setError] = useState('');

  function handleSearch() {
    if (!from || !to) {
      setError('Select both stations.');
      return;
    }
    if (from === to) {
      setError('Source and destination cannot be the same.');
      return;
    }
    setError('');
    onSearch(from, to);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.brand}>train finder</div>
      <div style={styles.form}>
        <div style={styles.field}>
          <div style={styles.label}>FROM</div>
          <Dropdown
            value={from}
            onChange={setFrom}
            options={stations}
            placeholder="—"
          />
        </div>

        <div style={styles.field}>
          <div style={styles.label}>TO</div>
          <Dropdown
            value={to}
            onChange={setTo}
            options={stations}
            placeholder="—"
          />
        </div>

        <button
          style={{ ...styles.btn, ...(loading ? styles.btnOff : {}) }}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'SEARCHING...' : 'SEARCH'}
        </button>
      </div>
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
}

const styles = {
  wrapper: {
    background: '#000',
    padding: '3rem 4rem',
  },
  brand: {
    fontSize: '3.5rem',
    fontWeight: '900',
    color: '#fff',
    letterSpacing: '-2px',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    marginBottom: '2.5rem',
    lineHeight: 1
  },
  form: {
    display: 'flex',
    gap: '3rem',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: 1,
    minWidth: '160px'
  },
  label: {
    fontSize: '0.65rem',
    letterSpacing: '0.2em',
    color: '#555',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: '500'
  },
  btn: {
    background: '#fff',
    color: '#000',
    border: 'none',
    padding: '0.75rem 2.5rem',
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: '700',
    cursor: 'pointer'
  },
  btnOff: {
    opacity: 0.4,
    cursor: 'not-allowed'
  },
  error: {
    color: '#fff',
    fontSize: '0.75rem',
    marginTop: '1.25rem',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    opacity: 0.5
  }
};

export default SearchBar;