import { useState, useEffect } from 'react';
import SearchBar from '../components/searchbar';
import DirectRouteCard from '../components/directroute';
import ConnectingRouteCard from '../components/connectingroute';
import { getStations, searchTrains } from '../api/trainapi';

function Home() {
  const [stations, setStations] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    getStations().then(data => setStations(data));
  }, []);

  async function handleSearch(from, to) {
    setLoading(true);
    setError('');
    setResults(null);
    try {
      const data = await searchTrains(from, to);
      setResults(data);
    } catch (err) {
      setError('Something went wrong. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }

  function getSortedRoutes() {
    if (!results) return [];
    const routes = [...results.routes];
    if (sortBy === 'price') {
      return routes.sort((a, b) => {
        const ap = a.type === 'direct' ? a.price : a.totalPrice;
        const bp = b.type === 'direct' ? b.price : b.totalPrice;
        return ap - bp;
      });
    }
    if (sortBy === 'departure') {
      return routes.sort((a, b) => {
        const at = a.type === 'direct' ? a.departure : a.leg1.departure;
        const bt = b.type === 'direct' ? b.departure : b.leg1.departure;
        return at.localeCompare(bt);
      });
    }
    return routes;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <SearchBar
          stations={stations}
          onSearch={handleSearch}
          loading={loading}
        />

        {error && <p style={styles.error}>{error}</p>}

        {results && (
          <div>
            <div style={styles.resultsHeader}>
              <span style={styles.resultsCount}>
                {results.totalResults} routes found for {results.from} → {results.to}
              </span>
              <select
                style={styles.sortSelect}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="price">Sort by Price</option>
                <option value="departure">Sort by Departure</option>
              </select>
            </div>

            {getSortedRoutes().length === 0 ? (
              <div style={styles.noResults}>
                No trains available for this route
              </div>
            ) : (
              getSortedRoutes().map((route, i) =>
                route.type === 'direct'
                  ? <DirectRouteCard key={i} route={route} />
                  : <ConnectingRouteCard key={i} route={route} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f0f2f5',
    padding: '2rem 1rem'
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  error: {
    color: '#e94560',
    textAlign: 'center'
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  resultsCount: {
    fontWeight: 'bold',
    color: '#1a1a2e'
  },
  sortSelect: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '0.9rem',
    cursor: 'pointer'
  },
  noResults: {
    textAlign: 'center',
    padding: '3rem',
    background: 'white',
    borderRadius: '12px',
    color: '#888',
    fontSize: '1.1rem'
  }
};

export default Home;