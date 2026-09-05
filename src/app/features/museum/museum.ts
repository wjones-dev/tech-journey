import { Component } from '@angular/core';

import { Timeline } from '../timeline/timeline';
import { Architecture } from '../architecture/architecture';
import { AboutBuild } from '../about-build/about-build';

@Component({
  selector: 'app-museum',
  standalone: true,

  imports: [
    Timeline,
    AboutBuild,
    Architecture
  ],

  templateUrl: './museum.html',
  styleUrl: './museum.css'
})
export class Museum {

}