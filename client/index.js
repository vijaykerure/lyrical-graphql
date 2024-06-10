import './styles/styles.css';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './components/App';
import Songs from './components/Songs';
import AddSong from './components/AddSong';
import SongDetails from './components/SongDetails';
import SongEdit from './components/SongEdit';

const client = new ApolloClient({
  uri: 'https://didactic-waddle-j45qx4pq6rq35446-4000.app.github.dev',
  cache: new InMemoryCache(),
  credentials: 'include',
});

// Supported in React 18+
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router basename='/'>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Songs />} />
            <Route path="/songs/new" element={<AddSong />} />
            <Route path="/songs/edit/:id" element={<SongEdit />} />
            <Route path="/songs/:id" element={<SongDetails />} />
          </Route>
        </Routes>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
);
