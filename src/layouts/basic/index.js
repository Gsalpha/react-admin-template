import React, { Suspense } from 'react'
import Menu from 'components/basic/menu'
import { Switch, Redirect } from 'react-router-dom'
import routerData from 'config/router'
import { observer, inject } from 'mobx-react'
import pathToRegexp from 'path-to-regexp'
import style from './index.module.scss'
import RouteLoading from 'components/basic/route-loading'
import { notification } from 'antd'
import DocumentTitle from 'react-document-title'
import AuthorizedRoute from 'components/basic/authorized-route'
import Header from 'components/basic/header'
import { isLogined } from 'helpers'
@inject('_user_')
@observer
class Basic extends React.Component {
    componentDidMount() {
        if (isLogined()) {
            this.props._user_.getCurUser().catch(err => {
                this.props.history.replace(process.env.REACT_APP_AUTH_ROUTE)
                notification.error({
                    message: '获取用户信息失败',
                    description: err.message
                })
            })
        } else {
            this.props.history.replace(process.env.REACT_APP_AUTH_ROUTE)
        }
    }
    getPageTitle = () => {
        const { location } = this.props
        const { pathname } = location
        let title = 'React App'
        let currRouterData = null
        for (const key in routerData) {
            if (pathToRegexp(key).test(pathname)) {
                currRouterData = routerData[key]
                break
            }
        }
        if (currRouterData && currRouterData.name) {
            title = `${currRouterData.name} - React App`
        }
        return title
    }

    render() {
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <section className={style.layout}>
                    <Menu />
                    <section className={style.container}>
                        <Header />
                        <section className={style.content}>
                            <Suspense fallback={<RouteLoading />}>
                                <Switch>
                                    {Object.keys(routerData).map(path => {
                                        if (routerData[path].redirect) {
                                            return (
                                                <Redirect
                                                    exact={true}
                                                    key={path}
                                                    from={path}
                                                    to={
                                                        routerData[path]
                                                            .redirect
                                                    }
                                                />
                                            )
                                        }
                                        if (routerData[path].component) {
                                            return (
                                                <AuthorizedRoute
                                                    key={path}
                                                    path={path}
                                                    component={
                                                        routerData[path]
                                                            .component
                                                    }
                                                    exect={true}
                                                />
                                            )
                                        }
                                        return null
                                    })}
                                    <AuthorizedRoute
                                        component={
                                            routerData['/exception/404']
                                                .component
                                        }
                                    />
                                    );
                                </Switch>
                            </Suspense>
                        </section>
                    </section>
                </section>
            </DocumentTitle>
        )
    }
}

export default Basic
