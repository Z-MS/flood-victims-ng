import { Component, input } from "@angular/core";

@Component({
    selector: 'stat-card',
    imports: [],
    template: `
        <div class="container">
            <div class="stat-card">
                <p class="stat-title">{{title()}}</p>
                <p class="number">{{stats()}}</p>
                <div>
                    <ng-content/>
                </div>
            </div>
        </div>
    `,
    styleUrl: "./stat-card.component.css"
})

export class StatCardComponent {
    title = input<string>();
    stats = input<number>();
}