import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

export enum SearchType {
  typeAhead,
}

@Injectable()
export class SearchService {

  constructor(private afs: AngularFirestore) { }

  public SearchCollection(term: string | number, collection: string, searchType: SearchType) {
    switch (searchType) {
      case SearchType.typeAhead: {
        return this.getTypeAheadResults(term, collection);
      }
    }
  }

  private getTypeAheadResults(term: string | number, collection: string) {

  }
}
