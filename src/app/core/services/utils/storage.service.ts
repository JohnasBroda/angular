import { Injectable } from '@angular/core';

@Injectable()
export class StorageSvc {
    public get<T>(key: string): any {
        for (let i = 0; i < localStorage.length; i++) {
            const currentKey = localStorage.key(i);
            if (currentKey === key) {
                return JSON.parse(localStorage.getItem(key));
            }
        }
    }

    public set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public clear() {
        localStorage.clear();
    }

    public remove(key: string) {
        for (let i = 0; i < localStorage.length; i++) {
            const currentKey = localStorage.key(i);
            if (currentKey === key ) {
                localStorage.removeItem(key);
                break;
            }
        }
    }
}
