import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'mobx-react'
import './index.scss'
import _root_ from 'stores/index'
import { initSentry } from 'helpers/report'
initSentry()
console.log(process.env)
ReactDOM.render(
    <Provider {..._root_}>
        <App />
    </Provider>,
    document.getElementById('root')
)
if (module.hot) {
    module.hot.accept('./App', () => {
        ReactDOM.render(
            <Provider {..._root_}>
                <App />
            </Provider>,
            document.getElementById('root')
        )
    })
}
