import 'reflect-metadata';
import { Container } from './Container';

type Constructor<T> = new (...args: any[]) => T;

/**
 * Repository decorator
 */
export function Repository<T>() {
  return function (target: Constructor<T>): Constructor<T> {
    Container.registerRepository(target.name, target);
    return target;
  };
}

/**
 * Service decorator
 */
export function Service<T>() {
  return function (target: Constructor<T>): Constructor<T> {
    Container.registerService(target.name, target);
    return target;
  };
}

/**
 * Facade decorator
 */
export function Facade<T>() {
  return function (target: Constructor<T>): Constructor<T> {
    Container.registerFacade(target.name, target);
    return target;
  };
}

/**
 * Property decorator for repository injection
 */
export function InjectRepository(repository: Constructor<any>): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const repositories = Reflect.getMetadata('repositories', target.constructor) || [];
    repositories.push({
      name: repository.name,
      propertyKey: propertyKey.toString()
    });
    Reflect.defineMetadata('repositories', repositories, target.constructor);
  };
}

/**
 * Property decorator for service injection
 */
export function InjectService(service: Constructor<any>): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol) {
    const services = Reflect.getMetadata('services', target.constructor) || [];
    services.push({
      name: service.name,
      propertyKey: propertyKey.toString()
    });
    Reflect.defineMetadata('services', services, target.constructor);
  };
}

export { Container };