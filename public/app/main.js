(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {

  /***/ "./src/$$_lazy_route_resource lazy recursive":
  /*!**********************************************************!*\
    !*** ./src/$$_lazy_route_resource lazy namespace object ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    function webpackEmptyAsyncContext(req) {
      // Here Promise.resolve().then() is used instead of new Promise() to prevent
      // uncaught exception popping up in devtools
      return Promise.resolve().then(function () {
        var e = new Error("Cannot find module '" + req + "'");
        e.code = 'MODULE_NOT_FOUND';
        throw e;
      });
    }

    webpackEmptyAsyncContext.keys = function () {
      return [];
    };
    webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
    module.exports = webpackEmptyAsyncContext;
    webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

    /***/
  }),

  /***/ "./src/app/app-routing.module.ts":
  /*!***************************************!*\
    !*** ./src/app/app-routing.module.ts ***!
    \***************************************/
  /*! exports provided: AppRoutingModule */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
      return AppRoutingModule;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
    /* harmony import */
    var _main_screen_main_screen_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main-screen/main-screen.component */ "./src/app/main-screen/main-screen.component.ts");
    /* harmony import */
    var _user_details_user_details_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user-details/user-details.component */ "./src/app/user-details/user-details.component.ts");


    var routes = [
      {path: '', component: _main_screen_main_screen_component__WEBPACK_IMPORTED_MODULE_3__["MainScreenComponent"]},
      {
        path: 'user/:username/details',
        component: _user_details_user_details_component__WEBPACK_IMPORTED_MODULE_4__["UserDetailsComponent"],
        data: {alwaysReload: true}
      },
      {path: '**', redirectTo: '', pathMatch: 'full'}
    ];
    var AppRoutingModule = /** @class */ (function () {
      function AppRoutingModule() {
      }

      AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
      ], AppRoutingModule);
      return AppRoutingModule;
    }());


    /***/
  }),

  /***/ "./src/app/app.component.html":
  /*!************************************!*\
    !*** ./src/app/app.component.html ***!
    \************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    module.exports = "<div class=\"main-container\">\n  <router-outlet></router-outlet>\n</div>\n"

    /***/
  }),

  /***/ "./src/app/app.component.scss":
  /*!************************************!*\
    !*** ./src/app/app.component.scss ***!
    \************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

    /***/
  }),

  /***/ "./src/app/app.component.ts":
  /*!**********************************!*\
    !*** ./src/app/app.component.ts ***!
    \**********************************/
  /*! exports provided: AppComponent */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
      return AppComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


    var AppComponent = /** @class */ (function () {
      function AppComponent() {
        this.title = 'frontend';
      }

      AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
          selector: 'sp-root',
          template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
          styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
      ], AppComponent);
      return AppComponent;
    }());


    /***/
  }),

  /***/ "./src/app/app.module.ts":
  /*!*******************************!*\
    !*** ./src/app/app.module.ts ***!
    \*******************************/
  /*! exports provided: CustomReuseStrategy, AppModule */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "CustomReuseStrategy", function () {
      return CustomReuseStrategy;
    });
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "AppModule", function () {
      return AppModule;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    /* harmony import */
    var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
    /* harmony import */
    var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
    /* harmony import */
    var _main_screen_main_screen_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./main-screen/main-screen.component */ "./src/app/main-screen/main-screen.component.ts");
    /* harmony import */
    var _user_details_user_details_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-details/user-details.component */ "./src/app/user-details/user-details.component.ts");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
    /* harmony import */
    var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");


    var CustomReuseStrategy = /** @class */ (function () {
      function CustomReuseStrategy() {
        this.handlers = {};
      }

      CustomReuseStrategy.prototype.shouldDetach = function (route) {
        return !!route.routeConfig &&
          !route.routeConfig.loadChildren && !(!!route.data && route.data.alwaysReload);
      };
      CustomReuseStrategy.prototype.store = function (route, handle) {
        var url = route.routeConfig.path;
        this.handlers[url] = handle;
      };
      CustomReuseStrategy.prototype.shouldAttach = function (route) {
        var url = route.routeConfig.path;
        return !!route.routeConfig && !!this.handlers[url] &&
          !route.routeConfig.loadChildren && !(!!route.data && route.data.alwaysReload);
      };
      CustomReuseStrategy.prototype.retrieve = function (route) {
        if (!route.routeConfig) {
          return null;
        }
        if (route.routeConfig.loadChildren) {
          return null;
        }
        return this.handlers[route.routeConfig.path];
      };
      CustomReuseStrategy.prototype.shouldReuseRoute = function (future, curr) {
        return future.routeConfig === curr.routeConfig;
      };
      return CustomReuseStrategy;
    }());

    var AppModule = /** @class */ (function () {
      function AppModule() {
      }

      AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
          declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
            _main_screen_main_screen_component__WEBPACK_IMPORTED_MODULE_5__["MainScreenComponent"],
            _user_details_user_details_component__WEBPACK_IMPORTED_MODULE_6__["UserDetailsComponent"]
          ],
          imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"]
          ],
          providers: [
            {provide: _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouteReuseStrategy"], useClass: CustomReuseStrategy}
          ],
          bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
      ], AppModule);
      return AppModule;
    }());


    /***/
  }),

  /***/ "./src/app/main-screen/main-screen.component.html":
  /*!********************************************************!*\
    !*** ./src/app/main-screen/main-screen.component.html ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    module.exports = "<header>\n  <img alt=\"Github Logo\" class=\"github-logo\"\n       src=\"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png\">\n  Github Users List\n</header>\n<main>\n  <div class=\"table-container\">\n    <div style=\"display: flex; width: 100%; margin-bottom: 1rem; justify-content: center\">\n      <div (click)=\"currentUser > 30 ? previousPage() : $event.preventDefault()\" [class.active]=\"true\" class=\"pag-btn\">\n        Previous\n      </div>\n      <div (click)=\"!(userList.length < 30) ? nextPage(): $event.preventDefault()\" [class.active]=\"true\"\n           class=\"pag-btn\">Next\n      </div>\n    </div>\n    <br>\n    <table>\n      <tr>\n        <th style=\"flex: .25\">User ID</th>\n        <th>Login</th>\n        <th></th>\n      </tr>\n      <tr *ngFor=\"let user of userList\">\n        <td style=\"flex: .25\">{{user.id}}</td>\n        <td><a href=\"{{user.html_url}}\" target=\"_blank\">{{user.login}}</a></td>\n        <td><a routerLink=\"/user/{{user.login}}/details\" style=\"font-weight: bolder\">More Info</a></td>\n      </tr>\n    </table>\n  </div>\n\n</main>\n<footer>\n  <a href=\"https://github.com/halkliff\" style=\"float: right\">\n    Werberth Lins, C 2019\n  </a>\n</footer>\n"

    /***/
  }),

  /***/ "./src/app/main-screen/main-screen.component.scss":
  /*!********************************************************!*\
    !*** ./src/app/main-screen/main-screen.component.scss ***!
    \********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4tc2NyZWVuL21haW4tc2NyZWVuLmNvbXBvbmVudC5zY3NzIn0= */"

    /***/
  }),

  /***/ "./src/app/main-screen/main-screen.component.ts":
  /*!******************************************************!*\
    !*** ./src/app/main-screen/main-screen.component.ts ***!
    \******************************************************/
  /*! exports provided: MainScreenComponent */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "MainScreenComponent", function () {
      return MainScreenComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    /* harmony import */
    var _service_main_screen_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service/main-screen.service */ "./src/app/main-screen/service/main-screen.service.ts");


    var MainScreenComponent = /** @class */ (function () {
      function MainScreenComponent(service) {
        this.service = service;
        this.currentUser = 0;
      }

      MainScreenComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.getUsers(this.currentUser).toPromise().then(function (response) {
          _this.userList = response.data;
          _this.currentUser = _this.userList[_this.userList.length - 1].id;
        }, function () {
          alert('Whoops! Something went wrong. Let\'s reload the page');
          window.location.reload();
        });
      };
      MainScreenComponent.prototype.previousPage = function () {
        var _this = this;
        this.service.getUsers(this.currentUser - 30).toPromise().then(function (response) {
          _this.userList = response.data;
          _this.currentUser = _this.userList[_this.userList.length - 1].id;
        }, function (err) {
          alert('Whoops! Something went wrong. Try to paginate to the previous page again!');
          console.error(err);
        });
      };
      MainScreenComponent.prototype.nextPage = function () {
        var _this = this;
        this.service.getUsers(this.currentUser + 30).toPromise().then(function (response) {
          _this.userList = response.data;
          _this.currentUser = _this.userList[_this.userList.length - 1].id;
        }, function (err) {
          alert('Whoops! Something went wrong. Try to paginate to the next page again!');
          console.error(err);
        });
      };
      MainScreenComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
          selector: 'sp-main-screen',
          template: __webpack_require__(/*! ./main-screen.component.html */ "./src/app/main-screen/main-screen.component.html"),
          styles: [__webpack_require__(/*! ./main-screen.component.scss */ "./src/app/main-screen/main-screen.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_service_main_screen_service__WEBPACK_IMPORTED_MODULE_2__["MainScreenService"]])
      ], MainScreenComponent);
      return MainScreenComponent;
    }());


    /***/
  }),

  /***/ "./src/app/main-screen/service/main-screen.service.ts":
  /*!************************************************************!*\
    !*** ./src/app/main-screen/service/main-screen.service.ts ***!
    \************************************************************/
  /*! exports provided: MainScreenService */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "MainScreenService", function () {
      return MainScreenService;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    /* harmony import */
    var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");


    var MainScreenService = /** @class */ (function () {
      function MainScreenService(http) {
        this.http = http;
      }

      MainScreenService.prototype.getUsers = function (since) {
        return this.http.get("https://shawnandpartners-test.herokuapp.com/api/users?since=" + since);
      };
      MainScreenService.prototype.getUserDetails = function (username) {
        return this.http.get("https://shawnandpartners-test.herokuapp.com/api/users/" + username + "/details");
      };
      MainScreenService.prototype.getUserRepos = function (username) {
        return this.http.get("https://shawnandpartners-test.herokuapp.com/api/users/" + username + "/repos");
      };
      MainScreenService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
          providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
      ], MainScreenService);
      return MainScreenService;
    }());


    /***/
  }),

  /***/ "./src/app/user-details/user-details.component.html":
  /*!**********************************************************!*\
    !*** ./src/app/user-details/user-details.component.html ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    module.exports = "<header>\n  <img alt=\"Github Logo\" class=\"github-logo\"\n       src=\"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png\">\n  <a routerLink=\"/\" style=\"color: white; margin-right: .25rem\">Github Users List /</a> User {{user.login}}\n</header>\n<main style=\"display: block\">\n\n  <p><b>UserID:</b> {{user.id}}</p><br>\n  <p><b>Username: </b> {{user.login}}</p><br><br>\n  <p><b>User link: </b> {{user.html_url}}</p><br>\n\n  <div class=\"table-container\">\n    <table>\n      <tr>\n        <th style=\"flex: .25\">Repository ID</th>\n        <th>Repository Name</th>\n        <th>Repository URL</th>\n      </tr>\n      <tr *ngFor=\"let repo of userRepos\">\n        <td style=\"flex: .25\">{{repo.id}}</td>\n        <td>{{repo.full_name}}</td>\n        <td><a href=\"{{repo.html_url}}\" target=\"_blank\">{{repo.html_url}}</a></td>\n      </tr>\n    </table>\n  </div>\n\n</main>\n<footer>\n  <a href=\"https://github.com/halkliff\" style=\"float: right\">\n    Werberth Lins, C 2019\n  </a>\n</footer>\n"

    /***/
  }),

  /***/ "./src/app/user-details/user-details.component.scss":
  /*!**********************************************************!*\
    !*** ./src/app/user-details/user-details.component.scss ***!
    \**********************************************************/
  /*! no static exports found */
  /***/ (function (module, exports) {

    module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXItZGV0YWlscy91c2VyLWRldGFpbHMuY29tcG9uZW50LnNjc3MifQ== */"

    /***/
  }),

  /***/ "./src/app/user-details/user-details.component.ts":
  /*!********************************************************!*\
    !*** ./src/app/user-details/user-details.component.ts ***!
    \********************************************************/
  /*! exports provided: UserDetailsComponent */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "UserDetailsComponent", function () {
      return UserDetailsComponent;
    });
    /* harmony import */
    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    /* harmony import */
    var _main_screen_service_main_screen_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../main-screen/service/main-screen.service */ "./src/app/main-screen/service/main-screen.service.ts");
    /* harmony import */
    var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");


    var UserDetailsComponent = /** @class */ (function () {
      function UserDetailsComponent(service, activatedRoute) {
        this.service = service;
        this.activatedRoute = activatedRoute;
        this.userRepos = [];
      }

      UserDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var username = this.activatedRoute.snapshot.paramMap.get('username');
        this.service.getUserDetails(username).toPromise().then(function (response) {
          _this.user = response.data;
          _this.service.getUserRepos(username).toPromise().then(function (response) {
            return _this.userRepos = response;
          }, function () {
            alert('Whoops! Couldn\'t load the user repositories.');
          });
        }, function () {
          alert('Whoops! Something went wrong. Let\'s reload the page');
          window.location.reload();
        });
      };
      UserDetailsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
          selector: 'sp-user-details',
          template: __webpack_require__(/*! ./user-details.component.html */ "./src/app/user-details/user-details.component.html"),
          styles: [__webpack_require__(/*! ./user-details.component.scss */ "./src/app/user-details/user-details.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_main_screen_service_main_screen_service__WEBPACK_IMPORTED_MODULE_2__["MainScreenService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
      ], UserDetailsComponent);
      return UserDetailsComponent;
    }());


    /***/
  }),

  /***/ "./src/environments/environment.ts":
  /*!*****************************************!*\
    !*** ./src/environments/environment.ts ***!
    \*****************************************/
  /*! exports provided: environment */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */
    __webpack_require__.d(__webpack_exports__, "environment", function () {
      return environment;
    });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
    var environment = {
      production: true
    };
    /*
     * For easier debugging in development mode, you can import the following file
     * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
     *
     * This import should be commented out in production mode because it will have a negative impact
     * on performance if an error is thrown.
     */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


    /***/
  }),

  /***/ "./src/main.ts":
  /*!*********************!*\
    !*** ./src/main.ts ***!
    \*********************/
  /*! no exports provided */
  /***/ (function (module, __webpack_exports__, __webpack_require__) {

    "use strict";
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */
    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
    /* harmony import */
    var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
    /* harmony import */
    var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
    /* harmony import */
    var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");


    if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
      Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
    }
    Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
      .catch(function (err) {
        return console.error(err);
      });


    /***/
  }),

  /***/ 0:
  /*!***************************!*\
    !*** multi ./src/main.ts ***!
    \***************************/
  /*! no static exports found */
  /***/ (function (module, exports, __webpack_require__) {

    module.exports = __webpack_require__(/*! C:\Users\werbe\Documents\testFront\src\main.ts */"./src/main.ts");


    /***/
  })

}, [[0, "runtime", "vendor"]]]);
//# sourceMappingURL=main.js.map
