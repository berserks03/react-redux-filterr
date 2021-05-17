import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Card from './components/card/Card';
import Main from './components/main/Main';
import Error from './components/main/Error';

const App = () =>{
  return (
    <BrowserRouter>
      <div className='container'>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/card/:id' component={Card} />
          <Route exact path='/error' component={Error} />
          <Redirect to='/' />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
