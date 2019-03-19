const Readline = require('readline')
function FibonacciSequence(n) {
    if (n >= 3) {
        return FibonacciSequence(n - 1) + FibonacciSequence(n - 2)
    } else {
       return n
    }
}
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function getReadLine(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            answer = parseFloat(answer)
            if (answer || answer === 0) {
                resolve(answer)
            } else {
                reject('输入错误')
            }   
        })  
    })  
}
getReadLine('请输入n：').then(ans => {
    console.log('结果为:\n')
    console.log(FibonacciSequence(ans))
    process.exit(0)
}).catch(err => {
    console.error(err)
    process.exit(0)
})

