// const Employee = require('../lib/Employee');
const Intern = require('../lib/Intern');

test('tests for intern to be an object', () => {
    const intern= new Intern();
    expect(typeof (intern)).toBe('object');
});

test('creates an intern object with valid parameters', () => {
    const intern = new Intern('Joe', 3, 'joe@joe.com', "UCF");

    expect(intern.name).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
    expect(intern.getRole()).toBe('Intern');
})