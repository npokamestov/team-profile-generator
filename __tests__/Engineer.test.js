// const Employee = require('../lib/Employee');
const Engineer = require('../lib/Engineer');

test('tests for engineer to be an object', () => {
    const engineer= new Engineer();
    expect(typeof (engineer)).toBe('object');
});

test('creates an engineer object with valid parameters', () => {
    const engineer = new Engineer('Bill', 2, "abc123@abc.com", 'billy');

    expect(engineer.name).toEqual(expect.any(String));
    expect(engineer.id).toEqual(expect.any(Number))
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.github).toEqual(expect.any(String));
    expect(engineer.getRole()).toBe('Engineer');
})