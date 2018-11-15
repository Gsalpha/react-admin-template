import { observable, action, computed } from 'mobx'
import { notification } from 'antd'
import { fetchLogin, fetchAuth } from 'api/user'
import { getFilteredMenuData } from 'config/menu'
class UserStore {
    @observable
    loginLoading = false
    @observable
    getCurUserLoading = true
    @observable
    user = {
        username: null,
        permissionRoute: []
    }

    @computed
    get flatPermissionRoutes() {
        return getFilteredMenuData(
            this.user.permissionRoute.map(item => item.path)
        )
    }
    @action
    async login(payload) {
        this.loginLoading = true
        try {
            await fetchLogin(payload)
            this.loginLoading = false
            window.localStorage.setItem('authority', 'admin')
            return true
        } catch (e) {
            this.loginLoading = false
            notification.error({
                message: '登录失败',
                description: e.message
            })
            throw e
        }
    }

    @action
    async getCurUser() {
        this.getCurUserLoading = true
        try {
            this.user = await fetchAuth()
            this.clearAuthLoading()
        } catch (e) {
            window.localStorage.setItem('authority', '')
            throw e
        }
    }
    @action
    clearAuthLoading() {
        this.getCurUserLoading = false
    }

    @action
    async logout() {
        this.user = {
            username: null,
            permissionRoute: []
        }
        await window.localStorage.setItem('authority', '')
    }
}

export default new UserStore()
