import React from 'react'
import style from './index.module.scss'
import { Form, Input, Icon, Button } from 'antd'
import DocumentTitle from 'react-document-title'
import { inject, observer } from 'mobx-react'
import { isLogined } from 'helpers'

const { Item } = Form

@inject('_user_')
@observer
class Auth extends React.Component {
    handleLogin = e => {
        e.preventDefault()
        const { validateFields } = this.props.form
        validateFields((err, payload) => {
            if (!err) {
                this.props._user_
                    .login(payload)
                    .then(() => {
                        this.props.history.push('/')
                    })
                    .catch(() => {
                        //
                    })
            }
        })
    }

    componentDidMount() {
        if (isLogined()) {
            this.props.history.replace('/')
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { loginLoading } = this.props._user_
        return (
            <DocumentTitle title="登录 - React App">
                <section className={style.auth}>
                    <header className={style.header}>
                        <h1>Auth</h1>
                    </header>
                    <section className={style.form}>
                        <Form onSubmit={this.handleLogin}>
                            <Item>
                                {getFieldDecorator('username', {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                'Please input your username!'
                                        }
                                    ]
                                })(
                                    <Input
                                        autoFocus={true}
                                        size="large"
                                        placeholder="gsh"
                                        prefix={
                                            <Icon
                                                type="user"
                                                style={{
                                                    color: 'rgba(0,0,0,.25)'
                                                }}
                                            />
                                        }
                                    />
                                )}
                            </Item>
                            <Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {
                                            required: true,
                                            message:
                                                'Please input your Password!'
                                        }
                                    ]
                                })(
                                    <Input
                                        type="password"
                                        size="large"
                                        placeholder="123"
                                        prefix={
                                            <Icon
                                                type="lock"
                                                style={{
                                                    color: 'rgba(0,0,0,.25)'
                                                }}
                                            />
                                        }
                                    />
                                )}
                            </Item>
                            <Item>
                                <Button
                                    size="large"
                                    loading={loginLoading}
                                    type="primary"
                                    htmlType="submit"
                                    className={style.loginBtn}
                                >
                                    登录
                                </Button>
                            </Item>
                        </Form>
                    </section>
                </section>
            </DocumentTitle>
        )
    }
}

export default Form.create()(Auth)
