#!/bin/bash
export SENTRY_AUTH_TOKEN=2138b3f9a3fb4edf905098afd28ce681752d95d1fd5d416f937e3b7e6d696be8
export SENTRY_ORG=4e23ffca613f
export SENTRY_PROJECT=refrain
VERSION=$(sentry-cli releases propose-version)
echo 'current sentry release version:'
echo $VERSION
echo '------------'
echo 'start building'
sentry-cli releases new -p refrain $VERSION
#REACT_APP_SENTRY_RELEASE_VERSION=$VERSION node scripts/build.js
sentry-cli releases set-commits --auto $VERSION
sentry-cli releases files $VERSION upload-sourcemaps --rewrite ./build/static/js/
