import { Observable } from "rxjs";


export abstract class CrudPort<T> {

    abstract create(value: T, object: Parse.Object): Observable<T>;
    abstract read(object: Parse.Object): Observable<Parse.Object[]>;
    abstract update(object: Parse.Object): Observable<void>;
    abstract delete(object: Parse.Object): Observable<void>;
}