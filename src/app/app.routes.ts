import {Routes} from '@angular/router';
import {SignInComponent} from "./pages/sign-in-page/sign-in.component";
import {SignUpComponent} from "./pages/sign-up-page/sign-up.component";
import {WelcomePageComponent} from "./pages/welcome-page/welcome-page.component";

const delay = (timout: number): Promise<void> => new Promise((resolve) => {
  setTimeout(() => resolve(), timout)
})

export const routes: Routes = [
  {path: '', component: WelcomePageComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},

  {
    path: 'posts',
    loadChildren: () =>
      import('./modules/posts/posts.module')
        .then(res => res.PostsModule)
  },

];
