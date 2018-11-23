/**
 * 路由级别鉴权以及RBAC
 */
import React from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'
import Exception from 'components/basic/exception'
import { observer, inject } from 'mobx-react'
import { isLogined } from 'helpers'

@inject('_user_')
@observer
class AuthorizedRoute extends React.Component {
    render() {
        const { getCurUserLoading, user } = this.props._user_
        const curPath = this.props.location.pathname
        const { component: Component, ...rest } = this.props
        return getCurUserLoading ? (
            'loading'
        ) : (
            <Route
                {...rest}
                render={props => {
                    // 未登录
                    if (!isLogined()) {
                        return (
                            <Redirect to={process.env.REACT_APP_AUTH_ROUTE} />
                        )
                    }
                    if (curPath.indexOf('exception') > -1) {
                        return <Component {...props} />
                    }
                    if (
                        !user.permissionRoute.find(
                            item => item.path === curPath
                        )
                    ) {
                        return <Exception type="403" />
                    }
                    return <Component {...props} />
                }}
            />
        )
    }
}

export default withRouter(AuthorizedRoute)
