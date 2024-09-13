import { Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { AdminComponent } from './layout/admin/admin.component';
import { HomeComponent } from './home/home/home.component';
import { PostsComponent } from './home/posts/posts.component';
import { PostComponent } from './home/posts/post/post.component';
import { PostEditComponent } from './home/posts/post-edit/post-edit.component';
import { adminGuard, adminGuardSignin } from './shared/guards/admin.guard';
import { UsersComponent } from './layout/admin/users/users.component';
import { UserComponent } from './layout/admin/user/user.component';
import { UserEditComponent } from './layout/admin/user-edit/user-edit.component';

export const routes: Routes = [
    {path: "signin/admin", component: AuthenticationComponent,  canActivate: [adminGuardSignin]},
    {path: "signin", component: SigninComponent},
    {path: "home/admin", component: AdminComponent, canActivate: [adminGuard], children: [
        {path: "user/:id/edit", component: UserEditComponent},
        {path: "user/:id", component: UserComponent},
        {path: "", component: UsersComponent},
    ]},
    {path: "home", component: LayoutComponent, children: [
        {path: "", component: HomeComponent},
        {path: "post", component: PostsComponent},
        {path: "post/:id", component: PostComponent},
        {path: "post/:id/edit", component: PostEditComponent}
    ]},
    {path: "", redirectTo: "/home", pathMatch: "full"},
    {path: "**", component: PageNotFoundComponent}
];
