import React from 'react';
import Navbar from './components/layouts/Navbar'
import Tracks from './components/Tracks/Tracks'
import Search from './components/layouts/Search'
import { LyricsProvider } from './Context'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Lyrics from './components/Tracks/Lyrics'

function App() {
  return (
    <Router>
    <LyricsProvider>
      <div className="App">
        <Navbar />
        <Route exact path='/' render={() => (
          <React.Fragment>
            <Search />
            <Tracks />
          </React.Fragment>
        )}/>
        <Route exact path='/tracks/lyrics/:id' component={ Lyrics }/>
      </div>
    </LyricsProvider>
    </Router>
  );
}

export default App;
