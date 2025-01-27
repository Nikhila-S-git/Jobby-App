import {Switch, Route} from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Home from './Components/Home'
import Header from './Components/Header'
import PageNotFound from './Components/PageNotFound'
import JobItemDetails from './Components/JobItemDetails'
import Jobs from './Components/Jobs'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={PageNotFound} />
      <Route component={PageNotFound} />
    </Switch>
  </>
)

export default App
