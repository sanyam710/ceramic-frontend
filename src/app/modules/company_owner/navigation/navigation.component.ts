import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }
  firstName: string | null = null;
  lastName: string | null = null;
  sidebar: HTMLElement | null = null;
  hamburger: HTMLElement | null = null;
  arrows: any;
  overlay: HTMLElement | null = null;
  profileDropdown: boolean = false;
  name: any = {};
  first_name: string = "";
  last_name: string = "";
  isSideBarOpen: boolean = false;
  userType: string | null = null;

  ngOnInit() {
    this.name = window.localStorage.getItem('name');
    this.userService.firstName$.subscribe(name => {
      this.first_name = name;
    });
    this.userService.lastName$.subscribe(name => {
      this.last_name = name;
    });
    this.name = this.userService.getUserName();
    this.first_name = this.name.first_name;
    this.last_name = this.name.last_name;
    this.userType = this.userService.getUserType();
  }

  ngAfterViewInit() {
    this.sidebar = document.getElementById("sidebar") as HTMLElement;
    this.hamburger = document.getElementById("topnav-hamburger-icon") as HTMLElement;
    const iconLinks = document.querySelectorAll(".iocn-link");
    this.overlay = document.getElementById("overlay") as HTMLElement;
    iconLinks.forEach(iconLink => {
      iconLink.addEventListener('click', () => {
        // Get the parent 'li' element
        const listItem = iconLink.closest('li');

        // Toggle 'showMenu' class on the clicked 'li' element
        listItem!.classList.toggle('showMenu');

        // Remove 'showMenu' class from all other 'li' elements
        const allListItems = document.querySelectorAll('li');
        allListItems.forEach(item => {
          if (item !== listItem) {
            item.classList.remove('showMenu');
          }
        });
      });
    });
    // this.arrows.forEach((arrow: { addEventListener: (arg0: string, arg1: (event: MouseEvent) => void) => void; }) => {
    //   arrow.addEventListener("click", this.handleArrowClick);
    // });
    document.addEventListener('click', (event) => {
      const isClickInsideSidebar = this.sidebar!.contains(event.target as Node);
      const isClickInsideHamburger = this.hamburger!.contains(event.target as Node);
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth <= 768;
      if (isMobile) {
        if (!isClickInsideSidebar && !isClickInsideHamburger) {
          this.sidebar!.classList.add('close');
          this.overlay!.classList.remove('active');
        }
      }
    });
  }
  toggleSidebar() {
    if (this.sidebar) {
      this.sidebar.classList.toggle("close");
      this.isSideBarOpen = !this.isSideBarOpen;
    }
    if (this.overlay) {
      this.overlay.classList.toggle("active");
    }
  }
  getTooltipText(option: string) {
    if (!this.isSideBarOpen) {
      return option;
    }
    else {
      return "";
    }
  }
  closeSideBar() {
    if (window.innerWidth <= 501) {
      this.toggleSidebar();
    }
  }
  handleArrowClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const arrowParent = target.parentElement?.parentElement; // selecting main parent of arrow
    if (arrowParent) {
      // Close other menus
      const allMenus = document.querySelectorAll(".showMenu");
      allMenus.forEach(menu => {
        if (menu !== arrowParent) {
          menu.classList.remove("showMenu");
        }
      });

      // Toggle menu for clicked arrow
      arrowParent.classList.toggle("showMenu");
    }
  }
  goTo(url: string) {
    this.router.navigate([
      url
    ])

  }
  logout() {
    window.localStorage.clear();
    this.router.navigate([
      'login'
    ])

  }
  toogleDropdown() {  
    // const button = document.getElementById('page-header-user-dropdown') as HTMLElement;
    // const ProfiledropdownMenu = document.getElementById('dropdown-menu');
    // const isExpanded = button.getAttribute('aria-expanded');
    // const newAttributeValue = isExpanded === 'true' ? 'false' : 'true'; // Toggle the value
    // button.setAttribute('aria-expanded', newAttributeValue);
    // button.classList.toggle('show', newAttributeValue === 'true');
    // this.profileDropdown = !this.profileDropdown;
    // // const dropdownBtn = document.getElementById('dropdown-menu') as HTMLElement;
    // // dropdownBtn.classList.toggle('show');

    // // Add 'show' class and set border-bottom style for the dropdown menu
    // if (ProfiledropdownMenu instanceof HTMLElement) {
    //   ProfiledropdownMenu.classList.toggle('show', !isExpanded);
    //   ProfiledropdownMenu.classList.toggle('profile', !isExpanded);

    //   // Add data-popper-placement attribute for the dropdown menu
    //   ProfiledropdownMenu.setAttribute('data-popper-placement', 'bottom-end');
    // }
  }
  toogleDropdownifOpen() {
    if (this.profileDropdown) {
      this.profileDropdown = false;
    }
  }
}
