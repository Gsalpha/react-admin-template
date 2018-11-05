import isEmpty from 'lodash/isEmpty'
import { isUrl } from '../helpers'

// menu data
const menuConfig = [
    {
        name: '控制面板',
        path: 'dashboard',
        children: [
            {
                name: '表单',
                path: 'table'
            }
        ]
    },
    {
        name: '异常页',
        path: 'exception',
        children: [
            {
                name: '403',
                path: '403'
            },
            {
                name: '404',
                path: '404'
            },
            {
                name: '500',
                path: '500'
            }
        ]
    }
]

const formatter = (data, parentPath = '/', parentAuthority) => {
    return data.map(item => {
        let { path } = item
        if (!isUrl(path)) {
            path = parentPath + item.path
        }
        const result = {
            ...item,
            path,
            authority: item.authority || parentAuthority
        }
        if (item.children && item.children.length > 0) {
            result.children = formatter(
                item.children,
                `${parentPath}${item.path}/`,
                item.authority
            )
        }
        return result
    })
}

const filterMenu = (menu, mapping = {}, parent = '') => {
    const currentPath = `${parent}/${menu.path}`
    if (!menu.children) {
        return mapping[currentPath] && menu
    }
    const filtered = { ...menu }
    filtered.children = []
    for (const child of menu.children) {
        const filteredChild = filterMenu(child, mapping, currentPath)
        if (filteredChild) {
            filtered.children.push(filteredChild)
        }
    }
    if (isEmpty(filtered.children)) {
        return
    }
    return filtered
}

export const getFilteredMenuData = menus => {
    // 默认有全部权限
    if (isEmpty(menus)) {
        return formatter(menuConfig)
    }
    const filteredMenus = []
    const mapping = {}
    for (const m of menus) {
        mapping[m] = true
    }
    for (const menu of menuConfig) {
        const filtered = filterMenu(menu, mapping)
        if (filtered) {
            filteredMenus.push(filtered)
        }
    }
    return formatter(filteredMenus)
}

export const getMenuData = () => formatter(menuConfig)
