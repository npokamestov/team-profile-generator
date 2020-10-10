const Employee = require('../lib/Employee');

class Engineer extends Employee {
    constructor(github) {
        super()
        this.github = github
    }
    getGithub() {
        console.log("GitHub link is: https://www.github.com/" + this.github)
        return `https://www.github.com/${this.github}`;
    }
    getRole() {
        return "Engineer"
    }
}

module.exports = Engineer