import React from 'react'
import { Button, notification } from 'antd'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
@withRouter
@inject('_user_')
@observer
class AuthorizedButton extends React.Component {
    static propTypes = {
        feature: PropTypes.string,
        children: PropTypes.node,
        onClick: PropTypes.func
    }
    constructor() {
        super()
        this.state = {
            isAuthorized: false
        }
    }
    componentDidMount() {
        const { location, feature } = this.props

        const pathMatch = this.props._user_.user.permissionRoute.find(
            item => item.path === location.pathname
        )
        if (!pathMatch) {
            this.setState({
                isAuthorized: false
            })
            return
        }
        const { features } = pathMatch
        if (Array.isArray(features)) {
            this.setState({
                isAuthorized: features.includes(feature)
            })
            return
        }
        if (features === '*') {
            this.setState({
                isAuthorized: true
            })
            return
        }
        this.setState({
            isAuthorized: features === feature
        })
    }

    handleClick = ev => {
        const { onClick } = this.props
        const { isAuthorized } = this.state

        if (isAuthorized) {
            typeof onClick === 'function' && onClick(ev)
        } else {
            notification.warning({
                message: '操作失败',
                description: '您无权限进行此项操作'
            })
        }
    }
    render() {
        const {
            children,
            onClick,
            history,
            location,
            match,
            staticContext,
            ...props
        } = this.props
        return (
            <Button onClick={this.handleClick} {...props}>
                {children}
            </Button>
        )
    }
}

export default AuthorizedButton
