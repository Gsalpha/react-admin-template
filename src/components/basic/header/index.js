import React, { memo } from 'react'
import style from './index.module.scss'
import { observer } from 'mobx-react'
import { Avatar, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'
import Logo from './logo'
const { Item } = Menu
const dropDownContent = handleLogout => (
    <Menu>
        <Item>
            <Link to="/admin/myself">个人中心</Link>
        </Item>
        <Item>
            <Link to="/admin/setting">系统设置</Link>
        </Item>
        <Item>
            <a
                href="/"
                onClick={e => {
                    e.preventDefault()
                    handleLogout()
                }}
            >
                注销
            </a>
        </Item>
    </Menu>
)
const Header = ({ onLogout, onToggleCollapsed, user }) => (
    <header className={style.header}>
        {/* <Button type="primary" size="small" onClick={onToggleCollapsed}>
            <Icon type={'menu-unfold'} />
        </Button> */}
        <Logo />
        <Dropdown overlay={dropDownContent(onLogout)}>
            <section className={style.auth}>
                <Avatar icon="user" />
                {user && <span className={style.name}>{user.username}</span>}
            </section>
        </Dropdown>
    </header>
)
export default observer(memo(Header))
