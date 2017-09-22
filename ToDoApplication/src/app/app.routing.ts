import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ToDoListComponent } from '../components/todoList/todoList.component';
import { AuthenticationGuard } from '../guards/athentication.guard';
import { RegisterComponent } from '../components/register/register.component';

const appRoutes: Routes = [
    { path: '', component: ToDoListComponent, canActivate: [AuthenticationGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},

    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
