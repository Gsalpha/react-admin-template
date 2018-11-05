import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from 'layouts/basic'
import RouteLoading from 'components/basic/route-loading'
const Auth = lazy(() => import('pages/auth/index'))
class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={<RouteLoading />}>
                    <Switch>
                        <Route
                            path="/auth"
                            component={props => <Auth {...props} />}
                        />
                        <Route path="/" component={Layout} />
                    </Switch>
                </Suspense>
            </BrowserRouter>
        )
    }
}

export default App
