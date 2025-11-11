const config = {
    grandpa: {
        hasAllergy: false,
        son: {
            hasAllergy: false,
            grandson: {
                hasAllergy: true
            }
        }
    }
}

const matrix = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 1, 1]
]


// Object.entries(config).map(([k, v])=>{
//     console.log(v)
// })


let x = Array.from({length: 20}, (_, i)=> i)
console.log(x)