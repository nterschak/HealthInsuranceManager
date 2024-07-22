import { Component, Input } from '@angular/core';
import { Claim } from 'src/app/_models/claim';

@Component({
  selector: 'app-claim-table',
  templateUrl: './claim-table.component.html',
  styleUrls: ['./claim-table.component.css']
})
export class ClaimTableComponent {
  @Input() claims!: Claim[];
}
