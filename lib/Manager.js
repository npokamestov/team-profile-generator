const Employee = require('../lib/Employee')

class Manager extends Employee {
    constructor(teamName, name, id, email, office) {
        super(name, id, email)
        this.office = office
        // this.teamName = teamName
    }
    // getTeamName() {
    //     return this.teamName
    // }
    getOffice() {
        return this.office;
    }
    getRole() {
        return "Manager"
    }
}

module.exports = Manager