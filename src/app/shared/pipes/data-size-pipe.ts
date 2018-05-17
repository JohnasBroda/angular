import { PipeTransform, Pipe } from '@angular/core';
import { DecimalPipe } from '@angular/common';

export enum DataSizeUnit {
    B = 'B',
    Kb = 'Kb',
    Mb = 'Mb',
    Gb = 'Gb',
}

@Pipe({ name: 'dataSize' })
export class DataSizePipe implements PipeTransform {
    constructor(private number: DecimalPipe) {}

    transform(bytes: number, dataUnit: DataSizeUnit): string {
        switch (dataUnit) {
            case DataSizeUnit.B: {
                return this.number.transform(bytes, '1.0-2') + ' bytes';
            }
            case DataSizeUnit.Kb: {
                return this.number.transform(bytes / 1024, '1.0-2') + ' Kb';
            }
            case DataSizeUnit.Mb: {
                return this.number.transform(bytes / (1024 * 1024), '1.0-2') + ' Mb';
            }
            case DataSizeUnit.Gb: {
                return this.number.transform(bytes / (1024 * 1024 * 1024), '1.0-2') + ' Gb';
            }
            default: {
                return this.number.transform(bytes / 1024, '1.0-2') + ' Kb';
            }
        }
    }
}
