import { Component, Input } from '@angular/core';
import { Claim } from 'src/app/_models/claim';

@Component({
  selector: 'app-claim-card',
  templateUrl: './claim-card.component.html',
  styleUrls: ['./claim-card.component.css']
})
export class ClaimCardComponent {
  @Input() claim?: Claim;
}
