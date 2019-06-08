export default store => ({
  path: "feedback",
  getComponent(nextState, cb) {
    import(/* webpackChunkName: "support" */ "./route")
      .then(({ default: { Component} }) => {  //then(({ default: { Component, reducer, rootSagas } })
        return cb(null, Component); //eslint-disable-line
      })
      .catch(error => {
        console.error(
          "Something went wrong while initializing the feedback module",
          error
        );
        cb(error); //eslint-disable-line
      });
  }
});
