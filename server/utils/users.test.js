const expect = require('expect');

const {Users} = require('./users');



describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Sam',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    }); 

    it('should add new user', () => {
        let users = new Users();
        const user = {
            id: '123',
            name: 'Frankie',
            room: 'The Office (UK) Fans'
        };

        const res = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const removed = users.removeUser('1');
        expect(users.users).toEqual([{
            id: '2',
            name: 'Sam',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]);

        expect(users.users.length).toBe(2);

        expect(removed).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
    });
    
    it('should not remove a user', () => {
        const removed = users.removeUser('123');
        expect(users.users).toEqual([{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Sam',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]);

        expect(users.users.length).toBe(3);

        expect(removed).toBeFalsy();
    });

    it('should find user', () => {
        const found = users.getUser('2');
        expect(found).toEqual({
            id: '2',
            name: 'Sam',
            room: 'React Course'
        });
    });
    
    it('should not find user', () => {
        const found = users.getUser('122');
        expect(found).toBeFalsy();
    });

    it('should return names for room Node Course', () => {
        const userList = users.getUserList('Node Course');
        expect(userList).toEqual(['Mike', 'Julie']);
    });
    
    it('should return names for room React Course', () => {
        const userList = users.getUserList('React Course');
        expect(userList).toEqual(['Sam']);
    });
});
