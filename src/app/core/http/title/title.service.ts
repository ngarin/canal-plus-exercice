import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private data: string;
  private continueSearch: boolean;

  constructor(
    @Inject('SWorker') private SWorker,
    private http: HttpClient,
  ) {}

  public fetch(): Observable<any> {
    return this.http.get('assets/title.basics.tsv', { responseType: 'text' })
      .pipe(
        map(res => {
          this.data = res;
        })
      );
  }

  public search(query: string = 'Star', year: string = null, subject$: Subject<boolean>) {
    const worker = this.SWorker.create([{ message: 'tsvToJson', func: this.tsvToJson }]);

    this.continueSearch = true;

    subject$.subscribe(continueSearch => {
      this.continueSearch = continueSearch;
    });

    return new Observable(subscriber => {
      subscriber.next({ done: false, results: [] });
      if (this.data) {
        this.sequenceParse(worker, this.data.split('\n'), query, year, subscriber)
          .then(() => {
            subscriber.next({ done: true });
          });
        return;
      }
    });
  }

  private sequenceParse(worker, data: string[], query, year, subscriber: Subscriber<any>, filteredData = []) {
    const chunk = data.splice(0, 1000);

    return worker.postMessage('tsvToJson', [ chunk , query, year])
      .then(parsedDataChunk => {
        const results = [ ...filteredData, ...parsedDataChunk ];

        if (parsedDataChunk.length) {
          subscriber.next({ done: false, results: parsedDataChunk });
        }

        if (!this.continueSearch) {
          return;
        }

        if (data.length) {
          return this.sequenceParse(worker, data, query, year, subscriber, results);
        }
      });
  }

  private tsvToJson(rows: string[], query: string, year: string) {
    return rows
      .map(line => line.split('\t'))
      .filter(row =>
        row
        && (row[2].toLowerCase().includes(query.toLowerCase()) || row[3].toLowerCase().includes(query.toLowerCase()))
        && (!year || row[5] === year)
      );
  }

}
