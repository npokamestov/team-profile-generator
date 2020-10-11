const inquirer = require('inquirer');
const fs = require('fs');

const generatePage = require('./src/page-template.js');
const { writeFile } = require('./utils/generate-site');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const teamMembers = [];
const employeeIds = [];

const promptUser = () => {

    const promptManager = () => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the team manager's name?",
                validate: name => {
                    if (name) {
                        return true;
                    }
                    else {
                        console.log("Please enter the manager's name!");
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the team manager's Employee ID?",
                validate: id => {
                    if (id) {
                        return true;
                    }
                    else {
                        console.log('Please enter an Employee ID!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the team manager's e-mail?",
                validate: email => {
                    if (email) {
                        return true;
                    }
                    else {
                        console.log('Please enter an e-mail!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'office',
                message: "What is the team manager's office number?",
                validate: office => {
                if (!office) {
                    console.log("Please enter an office number!");
                    return false;
                }
                else {
                    return true;
                }
                }
            }
        ])
        .then(answers => {
            const manager = new Manager (answers.teamName, answers.name, answers.id, answers.email, answers.office);
            teamMembers.push(manager);
            employeeIds.push(answers.id);
            promptAddEmployee();
        });
    };

    const promptEngineer = () => {
            console.log(`
==================
Add a New Engineer
==================
`);
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the engineer's name?",
                validate: name => {
                    if (name) {
                        return true;
                    }
                    else {
                        console.log('Please enter a name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the engineer's Employee ID?",
                validate: id => {
                    if (id) {
                        return true;
                    }
                    else {
                        console.log('Please enter an Employee ID!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the  engineer's e-mail?",
                validate: email => {
                    if (email) {
                        return true;
                    }
                    else {
                        console.log('Please enter an e-mail!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'github',
                message: "What is the engineer's GitHub username?",
                validate: github => {
                   if (!github) {
                       console.log("Please enter a GitHub username!");
                       return false;
                   }
                   else {
                       return true;
                   }
                }
            }
        ])
        .then(answers => {
            const engineer = new Engineer (answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(engineer);
            employeeIds.push(answers.id);
            promptAddEmployee();
        })
    };

    const promptIntern = () => {
        console.log(`
================
Add a New Intern
================
`);
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: "What is the intern's name?",
                validate: name => {
                    if (name) {
                        return true;
                    }
                    else {
                        console.log('Please enter a name!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'id',
                message: "What is the intern's Employee ID?",
                validate: id => {
                    if (id) {
                        return true;
                    }
                    else {
                        console.log('Please enter an Employee ID!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'email',
                message: "What is the  intern's e-mail?",
                validate: email => {
                    if (email) {
                        return true;
                    }
                    else {
                        console.log('Please enter an e-mail!');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'school',
                message: "What school did the intern attend?",
                validate: school => {
                   if (!school) {
                       console.log("Please enter a school name or school acronym!");
                       return false;
                   }
                   else {
                       return true;
                   }
                }
            }
        ])
        .then(answers => {
            const intern = new Intern (answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
            employeeIds.push(answers.id);
            promptAddEmployee();
        })
    };

    const promptAddEmployee = () => {
        return inquirer.prompt ([
            {
                type: 'list',
                name: 'employeeType',
                message: 'Would you like to add an employee to the team?',
                choices: ['Engineer', 'Intern', "No, I'm finished building the team."]
            }
        ])
        .then(({ employeeType }) => {
            if (employeeType === 'Engineer') {
                return promptEngineer(teamMembers);
            }
            else if (employeeType === 'Intern') {
                return promptIntern(teamMembers);
            }
            else {
                console.log('No more employees added')
                // console.log(teamMembers)
                writeFile(generatePage(teamMembers))
                .then(writeFileResponse => {
                })
                .catch(err => {
                    console.log(err);
                });
            }
        })
    };
    promptManager();
};

promptUser()