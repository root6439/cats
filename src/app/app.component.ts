import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ChildrenOutletContexts,
  Router,
} from '@angular/router';
import { AuthService } from './shared/utils/Auth.service';
import { slideInAnimation } from './shared/animations/slideIn';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private contexts: ChildrenOutletContexts
  ) {}

  goToSearch(): void {
    this.router.navigate(['cats/search']);
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
