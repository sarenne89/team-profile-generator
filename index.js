const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

//questions to gather information on the team
const questions = [
    {
        type: "input",
        name: "",
        message: "",
    }
]

// function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data)
}

// function to initialise questions
function init() {
    inquirer.prompt(questions).then((responses) => {
        console.log("Creating your team!");
        writeToFile("./ouput/team.html", generateTeam({...responses}));
    });
}

// function call to initialise questions
init();