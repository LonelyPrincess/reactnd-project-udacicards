# React Fundamentals: UdaciCards

[![Build Status](https://travis-ci.org/LonelyPrincess/reactnd-project-udacicards.svg?branch=master)](https://travis-ci.org/LonelyPrincess/reactnd-project-udacicards)
[![Inline docs](http://inch-ci.org/github/LonelyPrincess/reactnd-project-udacicards.svg?branch=master&style=shields)](http://inch-ci.org/github/LonelyPrincess/reactnd-project-udacicards)

This is the final project for the third module of the [Udacity's React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019), "React Native".

## Project description

The aim of this application is to allow the user to test their knowledge on any topic of their choice. The user can create decks (topics) and add cards (questions) to them. Once a deck is selected, the user can start a quiz and obtain an score based on their performance.

## Installation and deployment

### Pre-requisites

Before being able to run this application, you must have [Node Package Manager](https://nodejs.org/en/) or [Yarn](https://yarnpkg.com/) installed on your system.

To test the application either on an emulator or a mobile device, it's required to have the [Expo app](https://expo.io/tools#client) installed in order to run it.

### Get the application running

If you have all the required software installed, the first step to run this application is to install all of its dependencies and start the application's server.

To do so, you must open a console and, once located into the project's root directory, run the following commands:

```bash
# Install all project's dependencies
> npm install

# Run application's server
> npm start
```

These instructions assume that you've installed [Node Package Manager](https://nodejs.org/en/). If you are using [Yarn](https://yarnpkg.com/) instead, just replace `npm` with `yarn` in the commands listed above.

After running the `start` command, the console output should tell you at which URL is the application running and a QR code you may scan with your mobile phone by using the Expo app to avoid having to type the URL yourself.

Once you've either scanned the QR code or entered the expo URL in the Expo app, you should be able to test the project in your device. If you happen to come across a network error during this process, **ensure your mobile device is connected to the same network as the computer** in which you run the `start` command.

## Project structure

The project folder structure is as follows:

```bash
├── res
    ├── data
    ├── icons
└── src
    ├── main
    ├── test
```

Two folders can be found at the project's root path, being the `src` the most important one as it is the place where all of the application source code will live. The other one, `res`, will contain resources to be used by the application, including the app's icons and mock data files that can be used for testing purposes.

The `src` directory is divided in two parts, each one with a different purpose:

- `main` - As the name implies, this folder contains the main code for the project, being it the wrapper for all the files where the app's functionality is implemented.

- `test` - Code for unit testing is wrapped into this folder.

## Aspects to consider

### Project status

Although the specified criteria for passing the third project at the [Udacity's React Nanodegree](https://www.udacity.com/course/react-nanodegree--nd019) should be met by now, this repository will remain open to new features and improvements. Feel free to [open a new issue](https://github.com/LonelyPrincess/reactnd-project-udacicards/issues) if you have any suggestion or come across a bug that should eventually be fixed.

### Browser support

This application has only been tested in the following devices:

| Device model | Operating System |
|---|---|
| [Motorola Moto E (2nd Gen)](https://www.gsmarena.com/motorola_moto_e_(2nd_gen)-6986.php) | Android 6.0 |
| [BQ Aquaris X](https://www.gsmarena.com/bq_aquaris_x-8642.php) | Android 7.0 |

It's possible that _it might present unexpected behaviours or rendering problems in other operating systems_.

### Credits

If you need information of the resources used on this project, take a look at [this file](CREDITS.md). This includes links to some useful documentation resources, tools involved in the development process and credits to the authors of the icons used throughout the application.