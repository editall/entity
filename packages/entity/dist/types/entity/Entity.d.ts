import { Option } from "./Option";
export interface Report {
    (error: any[]): void;
}
export interface Factory<T> {
    (...arg: any): T;
}
export declare class Entity {
    #private;
    static parse<T extends Entity>(type: {
        new (): T;
    }, json: object | string, report?: Report, noUnion?: boolean): T | null;
    get fields(): [[string | symbol], {
        [key: string | symbol]: Option<any>;
    }];
    toJSON(): any;
    value<T>(factory: Factory<T>, option?: Option<T>): T;
    object<T>(factory: {
        new (...arg: any): T;
    }, option?: Option<T>): T;
    valueArray<T>(factory: (...arg: any) => T, option?: Option<T>): T[];
    objectArray<T>(factory: {
        new (...arg: any): T;
    }, option?: Option<T>): {
        [key: string]: T;
    };
    valueMap<T>(factory: (...arg: any) => T, option?: Option<T>): {
        [key: string]: T;
    };
    objectMap<T>(factory: {
        new (...arg: any): T;
    }, option?: Option<T>): {
        [key: string]: T;
    };
    get STRING(): string;
    string(option?: Option<string>): string;
    get BOOL(): boolean;
    bool(option?: Option<boolean>): boolean;
    get NUMBER(): number;
    number(option?: Option<number>): number;
}
export declare class Union extends Entity {
    static subTypes(type: {
        new (): Union;
    }, f: (type: {
        new (): Entity;
    }) => boolean): void;
}
