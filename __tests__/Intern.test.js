const Employee = require('../lib/Employee');
const Intern = require('../lib/Intern');

test('creates a new Intern object', () => {
    const intern = new Intern("UCF");

    expect(intern.school).toEqual(expect.any(String));
    expect(intern.getRole()).toBe('Intern');
})