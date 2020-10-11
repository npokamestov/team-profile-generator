const Employee = require('../lib/Employee');

test('tests for employee to be an object', () => {
    const employee = new Employee();
    expect(typeof (employee)).toBe('object');
});

test('creates an employee object with valid parameters', () => {
    const employee = new Employee('Nikita', 1, "abc123@abc.com");

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
})