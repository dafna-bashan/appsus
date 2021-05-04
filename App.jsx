const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { CarApp } from './pages/CarApp.jsx'
import { CarDetails } from './pages/CarDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { CarEdit } from './pages/CarEdit.jsx'
import { Home } from './pages/Home.jsx'


export function App() {
    return (
        <Router>
            <AppHeader />
            <main>
                <Switch>
                    <Route component={CarEdit} path="/car/edit/:carId?" />
                    <Route component={CarDetails} path="/car/:carId/:carVendor?" />
                    <Route component={CarApp} path="/car" />
                    <Route component={AboutUs} path="/about" />
                    <Route component={Home} path="/" />
                    {/* If we want to send props to a route: */}
                    {/* <Route render={(props)=> <AboutUs {...props} name="popo"/>} path="/about" /> */}
                </Switch>
            </main>
            <footer className="app-footer">
                ☕ coffeerights &copy; ☕
            </footer>
        </Router>
    )
}


