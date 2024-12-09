import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AdminGuard } from './admin.guard';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { BooksListComponent } from './components/books-list/books-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, data: {isLoginPage: true}, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'user-management', component: UserManagementComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'text-editor', component: TextEditorComponent, canActivate: [AuthGuard] },
  { path: 'editor/:id', component: TextEditorComponent, canActivate: [AuthGuard] },
  { path: 'books-list', component: BooksListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
