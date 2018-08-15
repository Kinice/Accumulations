name = 'html'
var person = {
    name: 'less',
    sayName: function() {
      console.log(`${name} -- `, `${this.name}`)
    },
    man: {
        name: 'sass',
        sayName: function() {
            console.log(`${name} -- `, `${this.name}`)
        }
    },
    woman: {
        name: 'stylus',
        sayName: () => {
            console.log(`${name} -- `, `${this.name}`)
            console.log(module)
            console.log(global.name)
        },
        mid: {
            name: 'gulp',
            sayName: () => {
                console.log(`${name} -- `, `${this.name}`)
            }
        }
    }
}

person.sayName()

person.man.sayName()

person.woman.sayName.call(person)
