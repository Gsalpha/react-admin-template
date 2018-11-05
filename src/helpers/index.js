/* eslint-disable no-useless-escape */
const UrlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

/**
 *
 * @param path {string}
 */
export const isUrl = path => {
    return UrlReg.test(path)
}

/**
 * 判断是否已登录
 */
export const isLogined = () => !!window.localStorage.getItem('authority')
