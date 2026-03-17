import { useState } from 'react';

function SearchBar({ stations, onSearch, loading }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [error, setError] = useState('');

  function handleSearch() {
    if (!from || !to) {
      setError('Please select both stations');
      return;
    }
    if (from === to) {
      setError('Source and destination cannot be the same');
      return;
    }
    setError('');
    onSearch(from, to);
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚂 Train Search</h1>
      <div style={styles.row}>
        <select
          style={styles.select}
          value={from}
          onChange={e => setFrom(e.target.value)}
        >
          <option value="">From</option>
          {stations.map(s => (
            <option key={s._id} value={s.name}>{s.name}</option>
          ))}
        </select>

        <select
          style={styles.select}
          value={to}
          onChange={e => setTo(e.target.value)}
        >
          <option value="">To</option>
          {stations.map(s => (
            <option key={s._id} value={s.name}>{s.name}</option>
          ))}
        </select>

        <button
          style={styles.button}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    background: '#1a1a2e',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem'
  },
  title: {
    color: 'white',
    marginBottom: '1rem',
    fontSize: '1.8rem'
  },
  row: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  select: {
    padding: '0.7rem 1rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    flex: 1,
    minWidth: '150px',
    cursor: 'pointer'
  },
  button: {
    padding: '0.7rem 2rem',
    borderRadius: '8px',
    border: 'none',
    background: '#e94560',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  error: {
    color: '#e94560',
    marginTop: '0.5rem'
  }
};

export default SearchBar;