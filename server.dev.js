require('./builds/bundle.js');
// module.hot.accept();

// console.log("module", module);

if (module.hot) {
  module.hot.accept('./builds/bundle.js', () => {
    console.log("reload, nigga");
    require('./builds/bundle.js');
  });
}
