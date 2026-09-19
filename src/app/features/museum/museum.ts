import { Component, HostListener } from '@angular/core';

import { TimelineComponent } from '../timeline/timeline';
import { ArchitectureComponent } from '../architecture/architecture';
import { AboutBuildComponent } from '../about-build/about-build';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-museum',
  standalone: true,

  imports: [TimelineComponent, AboutBuildComponent, ArchitectureComponent, RouterLink],

  templateUrl: './museum.html',
  styleUrl: './museum.css',
})
export class MuseumComponent {
  menuOpen = false;
  showBackToTop = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

    const scrollPercentage = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

    this.showBackToTop = scrollPercentage >= 0.3;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
