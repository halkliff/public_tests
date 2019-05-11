import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainScreenComponent} from './main-screen/main-screen.component';
import {UserDetailsComponent} from './user-details/user-details.component';
import {ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

export class CustomReuseStrategy implements RouteReuseStrategy {
  handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig &&
      !route.routeConfig.loadChildren && !(!!route.data && route.data.alwaysReload);
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    const url = route.routeConfig.path;
    this.handlers[url] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const url = route.routeConfig.path;
    return !!route.routeConfig && !!this.handlers[url] &&
      !route.routeConfig.loadChildren && !(!!route.data && route.data.alwaysReload);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }
    if (route.routeConfig.loadChildren) {
      return null;
    }
    return this.handlers[route.routeConfig.path];
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
