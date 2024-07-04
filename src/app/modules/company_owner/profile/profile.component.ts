import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from 'src/app/modules/shared/services/user.service';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private Location: Location,
    private userService: UserService
  ) { }
  slectedOption: string | null = null;
  userType: string | null=null;

  ngOnInit(): void {
    this.userType=this.userService.getUserType();
    const url = this.Location.path();
    const startingIndex = url.indexOf('profile');

    if (startingIndex !== -1 && startingIndex < url.length - 1) {
      const remainingPath = url.substring(startingIndex + 'profile'.length + 1);
      const segments = remainingPath.split('/');
     
      const staffSegment = segments.find(segment => segment !== '');

      if (staffSegment) {
        this.slectedOption = staffSegment;
        console.log('Staff:', staffSegment);
        // Now you have access to the "staff" segment
      }
    }



    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      const startingIndex = url.indexOf('profile');

      if (startingIndex !== -1 && startingIndex < url.length - 1) {
        const remainingPath = url.substring(startingIndex + 'profile'.length + 1);
        const segments = remainingPath.split('/');
        const staffSegment = segments.find(segment => segment !== '');
        console.log("sds",staffSegment);
        if (staffSegment) {
          this.slectedOption = staffSegment;
          console.log('Staff:', staffSegment);
          // Now you have access to the "staff" segment
        }
      }
    });
  }

  goTo(url: string) {
    this.router.navigate([
      url
    ])
  }
  optionSelected(option: string): boolean {
    if (this.slectedOption == option) {
      return true;
    }
    return false;
  }
}
