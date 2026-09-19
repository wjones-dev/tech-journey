import { Routes } from '@angular/router';

import { MuseumComponent } from './features/museum/museum';
import { TechnologyDetailComponent } from './features/technology-detail/technology-detail';
import { ApiExplorerComponent } from './features/api-explorer/api-explorer';
import { EngineeringLabComponent } from './features/engineering-lab/engineering-lab';

export const routes: Routes = [
  {
    path: '',
    component: MuseumComponent,
  },
  {
    path: 'technology/:id',
    component: TechnologyDetailComponent,
  },
  {
    path: 'explorer',
    component: ApiExplorerComponent,
  },

  {
    path: 'lab',
    component: EngineeringLabComponent,
  },
];
