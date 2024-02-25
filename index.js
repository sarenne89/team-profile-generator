const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const generateTeam = require("./src/page-template.js")
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const team = [];
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

//questions to gather information on the manager before enterring employee creation options
const generateManager = () => {
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
    team.push(manager)
    generateEmployee()
    })
};

//employee creation options, asks whether the user wants to add more employees or create the page
const generateEmployee = () => {
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
                generateEngineer();
                break;
                
            case "Intern":
                generateIntern();
                break;

            case "Team Complete":
                render();
        }
    })
};

//function to ask questions RE engineer details before returning to employee creation options
const generateEngineer = () => {
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
        team.push(engineer)
        generateEmployee()
    })
}

//function to ask questions RE details for the intern before returning to employee creation options
const generateIntern = () => {
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
        team.push(intern)
        generateEmployee()
    })
}

//function to create the page once the team details have been filled.
//first checks whether the output directory exists before creating the output file
const render = () => {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdir(OUTPUT_DIR, (err) => {
            if (err) {
                throw err
            }
        })
    }
    fs.writeFileSync(outputPath, generateTeam(team), "utf-8")
}

// function call to initialise questions
generateManager();