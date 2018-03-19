var name = 'html'
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
        }
    }
}

person.sayName()
// html -- less
person.man.sayName()
// html -- sass
person.woman.sayName.call(person)
// html -- html
