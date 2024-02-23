// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require (`./Employee`)

class Intern extends Employee {
    constructor(school) {
        super(name, id, email)
        this.school = school
    }
    getRole() {
        console.log(`Role: Intern`)
        return Intern
    }
}