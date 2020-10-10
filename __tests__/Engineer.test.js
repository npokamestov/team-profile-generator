const Employee = require('../lib/Employee');
const Engineer = require('../lib/Engineer');

test('creates a new engineer object', () => {
    const engineer = new Engineer("npokamestov");

    expect(engineer.github).toEqual(expect.any(String));
    expect(engineer.getRole()).toBe('Engineer');
})