import { Injectable } from '@angular/core';

import { PropertyResolver } from '../../core/services/property-resolver';

@Injectable()
export class FilterService {

    constructor() { }

    filter<T>(items: T[], data: string, props: string[]) {
        return items.filter((item: T) => {
            let match = false;
            for (const prop of props) {
                if (parseFloat(item[prop]) <= parseFloat(data)) {
                  match = true;
                  break;
                }
            }
            return match;
        });
    }

}
