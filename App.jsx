const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import { KeepApp } from './apps/keep/pages/KeepApp.jsx';
import { BookApp } from './apps/books/pages/BookApp.jsx';
import { EmailApp } from './apps/mail/pages/EmailApp.jsx';
import { EmailDetails } from './apps/mail/pages/EmailDetails.jsx';
import { AppFooter } from './cmps/AppFooter.jsx';

export function App() {
    return (
        <Router>
            <div className="app-container">
                <AppHeader />
                <main className="main-content">
                    <Switch>
                        {/* <Route component={EmailApp} path="/mail/add" /> */}
                        <Route component={EmailDetails} path="/mail/:mailId" />
                        <Route component={BookDetails} path="/book/:bookId" />
                        <Route component={BookAdd} path="/book/add" />
                        <Route component={BookApp} path="/book" />
                        <Route component={KeepApp} path="/keep" />
                        <Route component={EmailApp} path="/mail" />
                        <Route component={Home} path="/" />
                        {/* If we want to send props to a route: */}
                        {/* <Route render={(props)=> <AboutUs {...props} name="popo"/>} path="/about" /> */}
                    </Switch>
                </main>
                <AppFooter />
            </div>
        </Router>
    )
}


