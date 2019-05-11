import {TestBed} from '@angular/core/testing';

import {MainScreenService} from './main-screen.service';

describe('MainScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainScreenService = TestBed.get(MainScreenService);
    expect(service).toBeTruthy();
  });
});
