import * as Sentry from '@sentry/browser'
export const initSentry = () => {
    const isDev = process.env.NODE_ENV === 'development'

    const initConfig = {
        environment: isDev ? 'development' : 'production',
        dsn: process.env.REACT_APP_SENTRY_DSN
    }
    if (isDev) {
        initConfig.release = process.env.REACT_APP_SENTRY_RELEASE_VERSION
    }
    Sentry.init(initConfig)
}

export const report = error => {
    Sentry.captureException(error)
}
