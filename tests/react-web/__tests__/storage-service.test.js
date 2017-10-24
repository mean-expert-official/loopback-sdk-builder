import { StorageApi, CategoryApi, MessageApi } from './../app/shared/sdk/services';
let storageApi;
let categoryApi;
let messageApi;
describe('Service: Storage Service', () => {
  beforeEach(() => {
    storageApi = new StorageApi();
    categoryApi = new CategoryApi();
    messageApi = new MessageApi();
  });

  it('should contain storage model methods', () => {
      expect(storageApi).toBeTruthy();
      expect(storageApi.createContainer).toBeTruthy();
      expect(storageApi.getContainer).toBeTruthy();
      expect(storageApi.getContainers).toBeTruthy();
      expect(storageApi.destroyContainer).toBeTruthy();
      expect(storageApi.download).toBeTruthy();
      expect(storageApi.getFiles).toBeTruthy();
      expect(storageApi.getFile).toBeTruthy();
      expect(storageApi.removeFile).toBeTruthy();
      expect(storageApi.upload).toBeTruthy();
  });

  it('should create a new container instance', async () => {
      let container = Date.now().toString();
      await storageApi.create({ name: container })
        .subscribe((instance) => {
          expect(instance.name).toBeTruthy();
          expect(instance.name).toBe(container);
        });
    }
  );

  it('should get a container instance', async () => {
      let container = Date.now().toString();
      await storageApi.create({ name: container })
        .subscribe((instance) => {
          expect(instance.name).toBeTruthy();
          expect(instance.name).toBe(container);
          storageApi.getContainer(container).subscribe((gotInstance) => {
            expect(gotInstance.name).toBeTruthy();
            expect(gotInstance.name).toBe(container);
            expect(gotInstance.name).toBe(instance.name);
          });
        });
    })
});
