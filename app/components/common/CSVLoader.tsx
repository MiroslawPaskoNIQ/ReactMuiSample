import Papa from 'papaparse';
import type { ParseResult } from 'papaparse';
import { v4 as uuidv4 } from 'uuid';
import type { Retailer } from './Retailer';

export function LoadRetailers(file: string): Promise<Retailer[]> {
    return new Promise<Retailer[]>((resolve, reject) => {
        if (file == "") {
            reject(new Error("File cannot be empty"));
        }

        Papa.parse(file, {
            header: true,
            download: true,
            skipEmptyLines: true,
            delimiter: ",",
            complete: (results: ParseResult<Retailer>) => {
                results.data.forEach(element => {
                    element.RowId = uuidv4();
                });
                resolve(results.data);
            },
        })
    });
}

export function LoadRetailersPaginated(file: string, page: number, perPage: number): Promise<Retailer[]> {
    return new Promise<Retailer[]>((resolve, reject) => {
        if (file == "") {
            reject(new Error("File cannot be empty"));
        }
        
        Papa.parse(file, {
            header: true,
            download: true,
            skipEmptyLines: true,
            delimiter: ",",
            complete: (results: ParseResult<Retailer>) => {
                var currentIndex:number = (page - 1) * perPage;
                var endIndex:number = (currentIndex + perPage);
                var pageResults:Retailer[] = results.data.slice(currentIndex, endIndex);

                pageResults.forEach(element => {
                    element.RowId = uuidv4();
                });
                resolve(pageResults);
            },
        })
    });
}