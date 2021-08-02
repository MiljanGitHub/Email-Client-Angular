import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'emailAddressPipe' })
export class EmailAddressPipe {
    transform(addresses: string[]): string {
        return addresses.join('\n');
      }
}