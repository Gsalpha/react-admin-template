import { Menu } from 'antd'
import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import style from './index.module.scss'
import { inject, observer } from 'mobx-react'

const { Item, SubMenu } = Menu

const getSingleOpenKeys = location => {
    const { pathname } = location
    const index = pathname.lastIndexOf('/')
    const openKey = pathname.slice(0, index)
    return openKey || pathname
}
const getSingleSelectedKeys = location => {
    const { pathname } = location
    let short = ''
    if (pathname.lastIndexOf('/') === pathname.length - 1) {
        short = pathname.slice(0, pathname.length - 1)
    }
    return [pathname, short]
}

@inject('_user_')
@observer
class BaseMenu extends React.Component {
    static getDerivedStateFromProps(nextProps, prevState) {
        const nextOpenKey = getSingleOpenKeys(nextProps.location)
        if (prevState.lastOpenKey) {
            if (prevState.lastOpenKey !== nextOpenKey) {
                return {
                    openKeys: [nextOpenKey],
                    selectedKeys: getSingleSelectedKeys(nextProps.location),
                    lastOpenKey: nextOpenKey
                }
            }
            return {
                selectedKeys: getSingleSelectedKeys(nextProps.location),
                lastOpenKey: nextOpenKey
            }
        }
        return {
            openKeys: [nextOpenKey],
            selectedKeys: getSingleSelectedKeys(nextProps.location),
            lastOpenKey: nextOpenKey
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            openKeys: [getSingleOpenKeys(props.location)],
            selectedKeys: getSingleSelectedKeys(props.location),
            lastOpenKey: '',
            menuData: null
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.location.pathname !== this.props.location.pathname ||
            nextState.openKeys !== this.state.openKeys
        )
    }
    render() {
        const { openKeys, selectedKeys } = this.state
        const data = this.props._user_.flatPermissionRoutes
        if (!this.props._user_.getCurUserLoading) {
            return (
                <section className={style.menu}>
                    <Menu
                        inlineCollapsed={this.props._user_.collapsed}
                        mode="inline"
                        theme="light"
                        selectedKeys={selectedKeys}
                        openKeys={openKeys}
                        onOpenChange={this.handleSubChange}
                    >
                        {data &&
                            data.map(item => {
                                if (item.children && item.children.length > 0) {
                                    return (
                                        <SubMenu
                                            key={item.path}
                                            title={item.name}
                                        >
                                            {item.children.map(child => (
                                                <Item key={child.path}>
                                                    <Link to={child.path}>
                                                        {child.name}
                                                    </Link>
                                                </Item>
                                            ))}
                                        </SubMenu>
                                    )
                                }
                                return (
                                    <Item key={item.path}>
                                        <Link to={item.path}>{item.name}</Link>
                                    </Item>
                                )
                            })}
                    </Menu>
                </section>
            )
        }
        return null
    }

    handleSubChange = openKeys => {
        const latestOpenKey = openKeys.find(
            key => this.state.openKeys.indexOf(key) === -1
        )
        this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : []
        })
    }
}

export default withRouter(BaseMenu)
