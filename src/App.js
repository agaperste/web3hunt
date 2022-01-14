import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LandingPage from './pages/Landing'
import CollectionView from './pages/CollectionView'
import NFTView from './pages/NFTView'
import Logo from './assets/logo.svg'
const dotenv = require('dotenv')

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/nft/:address/:id">
          <NFTView />
        </Route>
        <Route path="/collection/:address/:id">
          <CollectionView />
        </Route>
        <Route path="/" component={LandingPage} /> 
      </Switch>
    </Router>
    <div className="logo">
      <img src={Logo}></img>
    </div>
    </div>
  );
}

export default App;
