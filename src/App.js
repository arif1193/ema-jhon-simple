import './App.css';
import Header from './components/header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NotFound from './components/NotFound/NotFound';
import Order from './components/Order/Order';
import ProductDetail from './components/ProductDetail/ProductDetail';



function App() {
  return (
    <div>      
      <Header></Header>
      <Router>
        <Switch>
          <Route path ='/shop'>
          <Shop></Shop>
          </Route>
          <Route path ='/review'>
            <Review></Review>
          </Route>
          <Route path ='/manage'>
              <Order></Order>
          </Route>
          <Route path ='/Inventory'>
              <Inventory></Inventory>
          </Route>
          <Route exact path ='/'>
              <Shop></Shop>
          </Route>
          <Route  path ='/product/:productKey'>
              <ProductDetail></ProductDetail>
          </Route>

          <Route path ='*'>
              <NotFound></NotFound>
          </Route>

        </Switch>

      </Router>
       
    </div>
  );
}

export default App;
