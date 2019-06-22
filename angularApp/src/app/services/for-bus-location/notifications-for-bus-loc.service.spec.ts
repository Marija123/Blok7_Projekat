import { TestBed } from '@angular/core/testing';

import { NotificationsForBusLocService } from './notifications-for-bus-loc.service';

describe('NotificationsForBusLocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificationsForBusLocService = TestBed.get(NotificationsForBusLocService);
    expect(service).toBeTruthy();
  });
});
