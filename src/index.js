if (module.hot) {
  // console.log("mod is hot!", module.hot);
  module.hot.accept();
  module.hot.dispose((fdfd) => {
    console.log("get rid of this??");
    console.log(module.hot);
  })
}

console.log(`hello there, Brochington sdf`);
console.log(__dirname, __filename);

const myStuff = () => {
  return new Promise((resolve, reject) => {
    resolve();
  })
}

async function something(stuff) {
  return "morestuff";
}
