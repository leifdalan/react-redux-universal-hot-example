import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
export default (store) => {
  function checkAuth(logged, replace, cb) {
    const { auth: { user } } = store.getState();
    if (!!user === !logged) replace('/');
    cb();
  }

  const requireLogin = (nextState, replace, cb) => {
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(() => checkAuth(true, replace, cb));
    } else {
      checkAuth(true, replace, cb);
    }
  };

  const requireNotLogged = (nextState, replace, cb) => {
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(() => checkAuth(false, replace, cb));
    } else {
      checkAuth(false, replace, cb);
    }
  };
  /**
   * Please keep routes in alphabetical order
   */
// <<<<<<< HEAD
//   return (
//     <Route path="/" component={App}>
//       {/* Home (main) route */}
//       <IndexRoute component={Home} />
//
//       {/* Routes requiring login */}
//       <Route onEnter={requireLogin}>
//         <Route path="chat" component={Chat} />
//         <Route path="loginSuccess" component={LoginSuccess} />
//       </Route>
//
//       {/* Routes disallow login */}
//       <Route onEnter={requireNotLogged}>
//         <Route path="register" component={Register} />
//       </Route>
//
//       {/* Routes */}
//       <Route path="login" component={Login} />
//       <Route path="about" component={About} />
//       <Route path="survey" component={Survey} />
//       <Route path="widgets" component={Widgets} />
//
//       {/* Catch all route */}
//       <Route path="*" component={NotFound} status={404} />
//     </Route>
//   );
// =======
  if (typeof require.ensure !== 'function') require.ensure = (deps, cb) => cb(require);

  return {
    path: '/',
    component: require('./containers/App/App'),
    indexRoute: {
      component: require('./containers/Home/Home')
    },
    childRoutes: [{
      path: 'login',
      getComponent(nextState, cb) {
        console.time('gettingComponent');
        store.dispatch({
          type: 'WEBPACK_LOAD'
        });
        require.ensure([], (require) => {
          cb(null, require('./containers/Login/Login'));
          store.dispatch({
            type: 'WEBPACK_LOAD_END'
          });
          console.timeEnd('gettingComponent');
        });
      }

    }, {
      path: 'about',
      getComponent(nextState, cb) {
        console.time('gettingComponent');
        store.dispatch({
          type: 'WEBPACK_LOAD'
        });
        require.ensure([], (require) => {
          cb(null, require('./containers/About/About'));
          store.dispatch({
            type: 'WEBPACK_LOAD_END'
          });
          console.timeEnd('gettingComponent');
        });
      }

    }, {
      path: 'survey',
      getComponent(nextState, cb) {
        require.ensure([], (require) =>
          cb(null, require('./containers/Survey/Survey')));
      }
    }, {
      path: 'widgets',
      getComponent(nextState, cb) {
        store.dispatch({
          type: 'WEBPACK_LOAD'
        });
        require.ensure([], (require) => {
          cb(null, require('./containers/Widgets/Widgets'));
          store.dispatch({
            type: 'WEBPACK_LOAD_END'
          });
        });
      }
    }, {
      onEnter: requireLogin,
      childRoutes: [
        {
          path: 'chat',
          getComponent(nextState, cb) {
            require.ensure([], (require) =>
              cb(null, require('./containers/Chat/Chat')));
          }
        },
        {
          path: 'loginSuccess',
          getComponent(nextState, cb) {
            require.ensure([], (require) =>
              cb(null, require('./containers/LoginSuccess/LoginSuccess')));
          }
        }
      ]
    }, {
      path: '*',
      getComponent(nextState, cb) {
        require.ensure([], (require) =>
          cb(null, require('./containers/NotFound/NotFound')));
      }
    }]
  };
};
