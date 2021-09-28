# My Movies

This is an app where you can find the newest and more popular movies.


## CI Status
[![Build Status](https://travis-ci.org/naabraz/my-movies-app.svg?branch=master)](https://travis-ci.org/naabraz/my-movies-app)

## Installation

- Run `yarn install` to install all dependencies
- Run `yarn start` to start Metro Bundler
- Run `yarn ios` to start iOS app (with iPhone SE as default simulator)
- Run `yarn android` to start Android app

## Running iOS app
- Create a `.env-vars.sh` file with `API_URL` value:
```
export API_URL=apiURL
```
- Run Sourcery to generate environment value swift file
```
cd ios && sourcery --templates EnvironmentValues.stencil \
--sources EnvironmentValues.stencil \
--output EnvironmentValues.swift \
--args apiURL=$API_URL \
&& cd ..
```
