console.log('index copy.js');
console.log(localStorage);
localStorage.clear()

class itemEntry{
    constructor(name,age,race){
        this.name = name
        this.age = age
        this.race = race
    }
}

const john = new itemEntry('john',24,'filipino')
const kenneth = new itemEntry('kenneth',25,'african')
const darrex = new itemEntry('darrex',29,'american')

const people = []

people.push(john)
people.push(kenneth)
people.push(darrex)

localStorage.setItem('people',JSON.stringify(people))

console.log(JSON.parse(localStorage.getItem('people'))[1]);