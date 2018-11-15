#!/bin/bash
export SENTRY_ORG=4e23ffca613f
export SENTRY_PROJECT=refrain
VERSION=$(sentry-cli releases propose-version)
echo '------------'
sentry-cli releases new -p refrain $VERSION
echo 'start building'
REACT_APP_SENTRY_RELEASE_VERSION=$VERSION node scripts/build.js
echo 'start release sentry'
sentry-cli releases set-commits --auto $VERSION
echo 'start upload sourcemaps'
sentry-cli releases files $VERSION upload-sourcemaps --url-prefix '~/static/js' ./build/static/js/ 
