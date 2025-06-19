import 'reflect-metadata';

/**
 * Dependency Container for managing instances
 */
export class Container {
  private static repositories = new Map<string, any>();
  private static services = new Map<string, any>();
  private static facades = new Map<string, any>();

  /**
   * Get or create a repository instance
   */
  static getRepository(name: string): any {
    if (!this.repositories.has(name)) {
      throw new Error(`Repository ${name} not found`);
    }
    return new (this.repositories.get(name))();
  }

  /**
   * Get or create a service instance with injected repositories
   */
  static getService(name: string): any {
    if (!this.services.has(name)) {
      throw new Error(`Service ${name} not found`);
    }

    const ServiceClass = this.services.get(name);
    const instance = new ServiceClass();

    // Inject repositories
    const repositories = Reflect.getMetadata('repositories', ServiceClass) || [];
    repositories.forEach((repo: { name: string; propertyKey: string }) => {
      instance[repo.propertyKey] = this.getRepository(repo.name);
    });

    return instance;
  }

  /**
   * Get or create a facade instance with injected services
   */
  static getFacade(name: string): any {
    if (!this.facades.has(name)) {
      throw new Error(`Facade ${name} not found`);
    }

    const FacadeClass = this.facades.get(name);
    const instance = new FacadeClass();

    // Inject services
    const services = Reflect.getMetadata('services', FacadeClass) || [];
    services.forEach((service: { name: string; propertyKey: string }) => {
      instance[service.propertyKey] = this.getService(service.name);
    });

    return instance;
  }

  /**
   * Register a repository class
   */
  static registerRepository(name: string, repository: any): void {
    this.repositories.set(name, repository);
  }

  /**
   * Register a service class
   */
  static registerService(name: string, service: any): void {
    this.services.set(name, service);
  }

  /**
   * Register a facade class
   */
  static registerFacade(name: string, facade: any): void {
    this.facades.set(name, facade);
  }
}