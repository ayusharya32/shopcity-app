import './App.scss'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './utils/PrivateRoute';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode'
import { logOut } from './redux/actions/authActions';
import { setTokenHeader } from './utils/AxiosUtils';
import { KEY_AUTH_TOKEN } from './utils/Constants';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import PaymentMethod from './pages/PaymentMethod';
import PlaceOrder from './pages/PlaceOrder';
import OrderDetails from './pages/OrderDetails';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';

toast.configure({ position: toast.POSITION.BOTTOM_CENTER, limit: 1 })
function App() {
  const dispatch = useDispatch()

  const authToken = localStorage.getItem(KEY_AUTH_TOKEN)
  if(authToken) {
    const decodedToken = jwtDecode(authToken)
    
    if(decodedToken.exp * 1000 < Date.now()) {
      dispatch(logOut())
    } else {
      setTokenHeader()
    }
  } 
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <>
            <Header />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/search/:keyword" component={Home} />
            <PrivateRoute exact path="/products/:productId" component={ProductDetails} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute exact path="/shipping" component={Shipping} />
            <PrivateRoute exact path="/payment" component={PaymentMethod} />
            <PrivateRoute exact path="/placeorder" component={PlaceOrder} />
            <PrivateRoute exact path="/orders/:orderId" component={OrderDetails} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/orders" component={MyOrders} />
          </>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
