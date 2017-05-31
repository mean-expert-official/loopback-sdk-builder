/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SDKBrowserModule, LoopBackConfig } from './shared/sdk';
import { Storage, Category, Message, FireLoopRef } from './shared/sdk/models';
import { StorageApi, CategoryApi, MessageApi, RealTime } from './shared/sdk/services';

describe('Service: Storage Service', () => {
  beforeEach(() => {
    LoopBackConfig.filterOnUrl();
    TestBed.configureTestingModule({
      imports: [
        SDKBrowserModule.forRoot()
      ]
    });
  });

  it('should contain storage model methods',
    async(inject([StorageApi], (service: StorageApi) => {
      expect(service).toBeTruthy();
      expect(service.createContainer).toBeTruthy();
      expect(service.getContainer).toBeTruthy();
      expect(service.getContainers).toBeTruthy();
      expect(service.destroyContainer).toBeTruthy();
      expect(service.download).toBeTruthy();
      expect(service.getFiles).toBeTruthy();
      expect(service.getFile).toBeTruthy();
      expect(service.removeFile).toBeTruthy();
      expect(service.upload).toBeTruthy();
    })
  ));

  it('should create a new container instance',
    async(inject([StorageApi], (storageApi: StorageApi) => {
      let container: string = Date.now().toString();
      return storageApi.create({ name: container })
        .subscribe((instance: any) => {
          expect(instance.name).toBeTruthy();
          expect(instance.name).toBe(container);
        });
    })
  ));

  it('should get a container instance',
    async(inject([StorageApi], (storageApi: StorageApi) => {
      let container: string = Date.now().toString();
      return storageApi.create({ name: container })
        .subscribe((instance: any) => {
          expect(instance.name).toBeTruthy();
          expect(instance.name).toBe(container);
          storageApi.getContainer(container).subscribe((gotInstance: any) => {
            expect(gotInstance.name).toBeTruthy();
            expect(gotInstance.name).toBe(container);
            expect(gotInstance.name).toBe(instance.name);
          });
        });
    })
  ));
});
