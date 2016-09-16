console.log(`hello there, Brochington`);

console.log(__dirname, __filename);

const myStuff = () => {
    return new Promise((resolve, reject) => {
        resolve();
    })
}

async function something(stuff) {
    return "morestuff";
}
