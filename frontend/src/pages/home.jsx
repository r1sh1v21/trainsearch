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
      setError('Could not reach the server.');
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
      <SearchBar stations={stations} onSearch={handleSearch} loading={loading} />

      <div style={styles.body}>
        {error && <div style={styles.error}>{error}</div>}

        {results && (
          <div>
            <div style={styles.bar}>
              <div style={styles.count}>
                {results.totalResults} RESULTS &nbsp;·&nbsp; {results.from.toUpperCase()} TO {results.to.toUpperCase()}
              </div>
              <select
                style={styles.sort}
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <option value="price">PRICE</option>
                <option value="departure">DEPARTURE</option>
              </select>
            </div>

            {getSortedRoutes().length === 0 ? (
              <div style={styles.empty}>No trains available for this route.</div>
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
    background: '#f5f5f5',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
  },
  body: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '0 4rem 6rem'
  },
  error: {
    fontSize: '0.75rem',
    color: '#000',
    padding: '1rem 0',
    letterSpacing: '0.05em'
  },
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 0',
    borderBottom: '1px solid #ddd',
    marginBottom: '2px'
  },
  count: {
    fontSize: '0.65rem',
    color: '#aaa',
    letterSpacing: '0.15em'
  },
  sort: {
    background: 'transparent',
    border: 'none',
    fontSize: '0.65rem',
    letterSpacing: '0.15em',
    color: '#aaa',
    cursor: 'pointer',
    outline: 'none',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
  },
  empty: {
    padding: '5rem 0',
    fontSize: '0.8rem',
    color: '#bbb',
    letterSpacing: '0.1em'
  }
};

export default Home;