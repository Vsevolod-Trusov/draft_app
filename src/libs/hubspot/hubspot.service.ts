import { Injectable } from '@nestjs/common';
import Hubspot from 'hubspot';

@Injectable()
class HubSpotService {
  #hubspot: Hubspot;

  constructor() {
    this.#hubspot = new Hubspot({
      apiKey: 'abc',
    });
  }

  public getHubSpotName() {
    return this.#hubspot.subscriptions.get('usevalad.trusau@innowise.com');
  }
}

export { HubSpotService };
