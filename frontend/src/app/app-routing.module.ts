import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainScreenComponent} from "./main-screen/main-screen.component";
import {UserDetailsComponent} from "./user-details/user-details.component";

const routes: Routes = [
  {path: '', component: MainScreenComponent},
  {path: 'user/:username/details', component: UserDetailsComponent, data: {alwaysReload: true}},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
