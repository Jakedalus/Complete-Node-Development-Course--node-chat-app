
class Users {
    constructor () {
        this.users = [];
    }

    addUser (id, name, room) {
        const user = { id, name, room };
        this.users.push(user);

        return user
    }

    removeUser (id) {
        const toRemove = this.getUser(id);

        if (toRemove) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return toRemove;
    }

    getUser (id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserList (room) {
        return this.users.filter((user) => user.room === room).map((user) => user.name);
    }

}

module.exports = { Users };

// class Pal {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }

// const me = new Pal('Jake', 36);
// console.log(me);
// console.log(me.getUserDescription());