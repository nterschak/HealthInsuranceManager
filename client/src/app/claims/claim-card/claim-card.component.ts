import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Claim } from 'src/app/_models/claim';

@Component({
  selector: 'app-claim-card',
  templateUrl: './claim-card.component.html',
  styleUrls: ['./claim-card.component.css']
})
export class ClaimCardComponent {
  @Input() claim?: Claim;
  @Input() isSelected = false;
  @Output() selected = new EventEmitter<number>();

  selectClaim() {
    if (this.claim?.id)
    this.selected.emit(this.claim.id);
  }
}
