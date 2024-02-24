const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateTeam = require("./src/page-template.js")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const devTeam = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

//questions to gather information on the team
const createManager = () => {
    return inquirer.prompt ([
        {
            type: "input",
            name: "managerName",
            message: "What is the Manager's name?",
        },
        {
            type: "input",
            name: "managerID",
            message: "What is the Manager's ID?",
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is the Manager's email address?",
        },
        {
            type: "input",
            name: "managerOffice",
            message: "What is the Manager's office number?",
        }
    ]).then(answers  => {
    const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice)
    devTeam.push(manager)
    createEmployee()
    })
};

const createEmployee = () => {
    return inquirer.prompt ([
        {
            type: "list",
            name: "menu",
            message: "Please select the next employee you could like to create:",
            choices: ["Engineer", "Intern", "Team Complete"]
        }
    ]).then(userChoice => {
        switch(userChoice.menu) {
            case "Engineer":
                createEngineer();
                break;
                
            case "Intern":
                createIntern();
                break;

            case "Team Complete":
                buildTeam();
        }
    })
};

const createEngineer = () => {
    return inquirer.prompt ([
        {
            type: "input",
            name: "engineerName", 
            message: "What is the engineer's name?",
        },
        {
            type: "input",
            name: "engineerID", 
            message: "What is the engineer's ID number?",
        },
        {
            type: "input",
            name: "engineerEmail", 
            message: "What is the engineer's email address?",
        },
        {
            type: "input",
            name: "engineerGithub", 
            message: "What is the engineers Github username?",
        },
    ]).then(answers => {
        const engineer = new Engineer (answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub)
        devTeam.push(engineer)
        createEmployee()
    })
}

const createIntern = () => {
    return inquirer.prompt ([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?",
        },
        {
            type: "input",
            name: "internID",
            message: "What is the intern's ID number?",
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email address?",
        },
        {
            type: "input",
            name: "internSchool",
            message: "What school does the intern attend?",
        },
    ]).then(answers => {
        const intern = new Intern (answers.internName, answers.internID, answers.internEmail, answers.internSchool)
        devTeam.push(intern)
        createEmployee()
    })
}

// function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data)
}

// function to initialise questions
function init() {
    inquirer.prompt(createManager).then((responses) => {
        console.log("Creating your team!");
        writeToFile("./ouput/team.html", generateTeam({...responses}));
    });
}

// function call to initialise questions
init();