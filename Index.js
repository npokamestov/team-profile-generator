const inquirer = require('inquirer');
const fs = require('fs');

const generatePage = require('./src/page-template.js');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
// const { createReadStream } = require('fs');
const { writeFile } = require('./utils/generate-site');

const teamMembers = [];
const employeeIds = [];

const promptUser = () => {

    const promptManager = () => {
        return inquirer.prompt([
            // {
            //     type: 'input',
            //     name: 'teamName',
            //     message: 'What is the name of the team?',
            //     validate: teamName => {
            //         if (teamName) {
            //             return true;
            //         }
            //         else {
            //             console.log("Please enter the team's name!");
            //             return false;
            //         }
            //     }
            // },
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
                    console.log(writeFileResponse);
                })
                .catch(err => {
                    console.log(err);
                });
                // return teamMembers;
            }
        })
        // .then(pageHTML => {
        //     return writeFile(pageHTML);
        // })
        // .then(writeFileResponse => {
        //     console.log(writeFileResponse);
        //     return copyFile();
        // })
        // .then(copyFileResponse => {
        //     console.log(copyFileResponse);
        // })
        // .catch(err => {
        //     console.log(err);
        // });
    };

    // function createTeam() {
    //     if (!fs.existsSync("./dist/")) {
    //         fs.mkdirSync("./dist/")
    //     }
    //     fs.writeFileSync("./dist/sampleIndex.html", teamMembers);
    // }
    promptManager();
};

promptUser()
    // .then(teamMembers => {
    //     return generatePage(teamMembers)
    // })
    // .then(pageHTML => {
    //     return writeFile(pageHTML);
    // })
    // .then(writeFileResponse => {
    //     console.log(writeFileResponse);
    //     return copyFile();
    // })
    // .then(copyFileResponse => {
    //     console.log(copyFileResponse);
    // })
    // .catch(err => {
    //     console.log(err);
    // });



// const promptEmployeeEngineer = () => {
//     if (!employeeData.engineer) {
//         employeeData.engineer = [];
//     }
//     console.log(`
// =================
// Add a New Egineer
// =================
// `);
//     return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'name',
//             message: 'What is the name?',
//             validate: name => {
//                 if (name) {
//                     return true;
//                 }
//                 else {
//                     console.log('Please enter a name!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'id',
//             message: 'What is the Employee ID?',
//             validate: id => {
//                 if (id) {
//                     return true;
//                 }
//                 else {
//                     console.log('Please enter an Employee ID!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'email',
//             message: 'What is the e-mail?',
//             validate: email => {
//                 if (email) {
//                     return true;
//                 }
//                 else {
//                     console.log('Please enter an e-mail!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'github',
//             message: 'What is the GitHub username?',
//             validate: github => {
//                if (!github) {
//                    console.log("Please enter a GitHub username!");
//                    return false;
//                }
//                else {
//                    return true;
//                }
//             }
//         }
//     ])
//     .then(engineerData => {
//         employeeData.engineer.push(engineerData);
//         console.log(employeeData)
//         return employeeData;
//     })
//     .then(promptAddEmployee)
// }

// const promptEmployeeIntern = () => {
//     if (!employeeData.intern) {
//         employeeData.intern = [];
//     }
//     console.log(`
// ================
// Add a New Intern
// ================
// `);
//     return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'name',
//             message: 'What is the name?',
//             validate: name => {
//                 if (name) {
//                     return true;
//                 }
//                 else {
//                     console.log('Please enter a name!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'id',
//             message: 'What is the Employee ID?',
//             validate: id => {
//                 if (id) {
//                     return true;
//                 }
//                 else {
//                     console.log('Please enter an Employee ID!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'email',
//             message: 'What is the e-mail?',
//             validate: email => {
//                 if (email) {
//                     return true;
//                 }
//                 else {
//                     console.log('Please enter an e-mail!');
//                     return false;
//                 }
//             }
//         },
//         {
//             type: 'input',
//             name: 'school',
//             message: 'What school did they attend?',
//             validate: school => {
//             if (!school) {
//                 console.log("Please enter a school name!");
//                 return false;
//             }
//             else {
//                 return true;
//             }
//             }
//         },
//     ])
//     .then(internData => {
//         employeeData.intern.push(internData);
//         console.log(employeeData);
//         return employeeData;
//     })
//     .then(promptAddEmployee)
// }

// const promptAddEmployee = () => {
//     return inquirer.prompt([
//         {
//             type: 'list',
//             name: 'employeeType',
//             message: "Would you like to add another employee?",
//             choices: ['Engineer', 'Intern', "No, I'm finished building my team."],
//         }
//     ])
//     .then(({ employeeType }) => {
//         if (employeeType === 'Engineer') {
//             return promptEmployeeEngineer(employeeData);
//         }
//         else if (employeeType === 'Intern') {
//             return promptEmployeeIntern(employeeData);
//         }
//         else {
//             console.log('No more employees added')
//             console.log(employeeData)
//             return employeeData;
//         }
//     })
// }

// promptEmployeeManager()
//     .then(employeeData => {
//         return generatePage(employeeData);
//     })
//     .then(pageHTML => {
//         return writeFile(pageHTML);
//     })
//     .then(writeFileResponse => {
//         console.log(writeFileResponse);
//         return copyFile();
//     })
//     .then(copyFileResponse => {
//         console.log(copyFileResponse);
//     })
//     .catch(err => {
//         console.log(err);
//     });