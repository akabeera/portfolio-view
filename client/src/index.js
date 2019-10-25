import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Switch, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import App from './components/App';
import Header from './components/Header';
import AddAccount from './components/AddAccount';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log('store', store);
console.log('store.getState()', store.getState());
store.subscribe(() => console.log('store.getState()', store.getState()));

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <Switch>
                <Route exact={true} path='/' render={() => <Header><App/></Header>}/>
                <Route path='/add' render={() => <Header><AddAccount/></Header>}></Route>
            </Switch>
        </Router>
    </Provider>, 
    document.getElementById('root')
)