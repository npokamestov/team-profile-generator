// const Employee = require('../lib/Employee');
const Manager = require('../lib/Manager');

test('tests for manager to be an object', () => {
    const manager= new Manager();
    expect(typeof (manager)).toBe('object');
});

test('creates an manager object with valid parameters', () => {
    const manager = new Manager('Kevin', 1, 'kevin@kevin.com', 1)

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.office).toEqual(expect.any(Number));
    expect(manager.getRole()).toBe('Manager');
})