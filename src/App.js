import React from 'react'
import Covid from './covid' 
import {Route,Switch,HashRouter,Redirect} from 'react-router-dom'
function App()
{
  return (
    <>
    <HashRouter basename='/covid-19-stats-react-app'>
      <Switch>
        <Route exact path='/'>
        <Covid />
        </Route>
        <Route><Redirect to='/'></Redirect></Route>
      </Switch>
    </HashRouter>
    
    </>
  )
}
export default App;