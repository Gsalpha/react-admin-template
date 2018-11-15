#!/bin/bash
VERSION=$(sentry-cli releases propose-version)
echo 'current sentry release version:'
echo $VERSION
echo '------------'
echo 'start node server'
REACT_APP_SENTRY_RELEASE_VERSION=$VERSION node scripts/start.js
