/* General setup */
global.fetch = require('node-fetch'); // eslint-disable-line no-undef
// console.log(fetch);

const myStuff = () => {
    return new Promise((resolve, reject) => {
        resolve();
    })
}

async function something(stuff) {
    const resp = await fetch('http://www.google.com')
    const body = await resp.text();
    console.log('resp', body);
}

// something();
console.log(GlobalFetch)
