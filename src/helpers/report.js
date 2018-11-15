import * as Sentry from '@sentry/browser'
export const initSentry = () =>
    Sentry.init({
        release: process.env.REACT_APP_SENTRY_RELEASE_VERSION,
        environment:
            process.env.NODE_ENV === 'development'
                ? 'development'
                : 'production',
        dsn: process.env.REACT_APP_SENTRY_DSN
    })
export const report = error => {
    Sentry.captureException(error)
}
