import { inject, Injectable } from "@angular/core";
import { DocumentData } from "@angular/fire/compat/firestore";
import { collection, collectionData, Firestore } from "@angular/fire/firestore";
import { BehaviorSubject, map, Observable, tap } from "rxjs";

export interface Stats {
    totalDisplacedCount?: number,
    numberOfChildren?: number,
    totalFemalesCount?: number,
    numberOfWidows?: number,
    numberOfDivorcees?: number,
} 

@Injectable({
    providedIn: 'root'
})

export class DisplacedPersonsService {
    firestore: Firestore = inject(Firestore);

    displacedDataLoading$ = new BehaviorSubject<boolean>(true);
    displacedPersons$: Observable<DocumentData[]> | undefined;
    stats$ = new BehaviorSubject<Stats>({
        totalDisplacedCount: 0,
        numberOfChildren: 0,
        totalFemalesCount: 0,
        numberOfWidows: 0,
        numberOfDivorcees: 0,
    })

    constructor () {
        this.setupObservables();
    }

    private setupObservables() {

        const displacedPersonsCollection = collection(this.firestore, 'displaced');

        this.displacedPersons$ = collectionData(displacedPersonsCollection);
        
        this.displacedPersons$.pipe(
            map(displacedPersons => this.fetchDisplacedCounts(displacedPersons)),
            tap(() => {
                this.displacedDataLoading$.next(false)
            })
        ).subscribe();
    }

    fetchDisplacedCounts(displacedPersons: DocumentData[]) {
        try {
            const getCounts = (): Stats => {
                let totalDisplacedCount = 0, numberOfChildren = 0, totalFemalesCount = 0, numberOfWidows = 0, numberOfDivorcees = 0;
                displacedPersons.forEach((person: any) => {
                    totalDisplacedCount++;
                    if (person.age < 13) {
                        numberOfChildren++;
                    }
                    if (person.gender === "Female") {
                        totalFemalesCount++;
                    }
                    if(person.maritalStatus === 'Widowed') {
                        numberOfWidows++
                    }
                    if(person.maritalStatus === 'Divorced') {
                        numberOfDivorcees++
                    }
                });
        
                return { totalDisplacedCount, numberOfChildren, totalFemalesCount, numberOfWidows, numberOfDivorcees }
            }
            this.stats$.next(getCounts());
        } catch(err) {
            console.error(err);
        }
    }
}