# FTS Angular Project

## Description

This project is a code assessment for FTS. It is built using Angular and includes various dependencies and scripts to facilitate development and testing.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Screen

![](https://github.com/PaladinKnightMaster/fts-anuglar/blob/master/screen-capture.gif)

## Table of Contents

- [Description](#description)
- [Screen](#screen)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [License](#license)

## Installation

To set up the project, clone the repository and install the required dependencies using npm:

1. Clone the repository:

    ```sh
    git clone https://github.com/PaladinKnightMaster/fts-angular.git
    cd fts-angular
    ```

2. Install Angular CLI:

    Major versions of Angular CLI follow the supported major version of Angular, but minor versions can be released separately.

    Install the CLI using the npm package manager:

    ```sh
    npm install -g @angular/cli
    ```

## Usage
To run the project locally, use the following npm script:

```sh
npm start
```
This will start the development server on http://localhost:4200 and open the application in your default browser.

## Testing
To run the test cases, use the following command:

```sh
npm test
```
This will execute the tests and generate a code coverage report.

To view the coverage report in HTML format, open the following file in your browser:
```
coverage/index.html
```

## Project Structure

```bash
fts-angular/
├── src/
│   ├── app/
│   │   ├── components
│   │   │   ├───currency-input
│   │   │   ├───item
│   │   │   ├───item-list
│   │   │   ├───item-property
│   │   ├── models/
│   │   ├── store/
│   │   │   └───item
│   │   ├── app.component.ts
│   │   └── ...
│   ├── assets/
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── coverage/
│   └── index.html
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.spec.json
```

## License
This project is licensed under the UNLICENSED license.
