# Readme

This project is a research vehicle for my final year project at the University of Glasgow, it makes use of next.js three.js and MUI as the three main libraries. It is written mostly in typescript and uses react for component based web UI design.

The idea of the project was to create and test a new 3D visualisation tool that would aid secondry school students in learning basic cryptographic concepts. Using three.js the software renders a 3D model of the engima machine on the webpage that has some interactivity aspects that student can engage with.

### Requirements
The key requirement to get started building or developing with this project is [pnpm](https://pnpm.io/) a node package manager. It was used throught the development of this project and no other package managers have been tested or used so I cannot guarantee that any others would work without issue. **Please install this on you machine before continuing.**

## Build instructions

Fistly you should run ```pnpm install``` to ensure you have all project dependencies installed.

To create static files for the project run ```pnpm build``` which will start a next.js build job that will dump static files in a default directory in the project. This is not necessary for this project since it is not a product and was not deployable solution. If you would however like to use the software without starting a development enviroment outlined below - please navigate [here](https://learn.mrktrnbll.dev/) - **I can not gaurantee the availabilty of this deployment as it is a personal endevor not a requirement of the project.**

### Start development enviroment

The command ```pnpm run dev``` will be runnable after dependencies have been installed, if you have not already ran ```pnpm install``` do so before running the dev command.

This will then allow you to access http://localhost:3000/ and use the software. The software it self is the manual, since this is aimed to be a standalone tool the use of the software is expalained in the tutorial walkthrough.

### Test steps

There is a test suite created for the encryption process of the engima machine. Running ```pnpm test``` will start the test job. Note however this is an incredibly small coverage and most of the project is UI based, interacting with the software with localhost and performing manual testing was a much larger aspect of this project.

