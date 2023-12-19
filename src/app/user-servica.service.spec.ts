import { TestBed } from '@angular/core/testing';

import { UserServicaService } from './user-servica.service';

describe('UserServicaService', () => {
  let service: UserServicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserServicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
