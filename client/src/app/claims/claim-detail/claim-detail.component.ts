import { Component, Input, OnInit } from '@angular/core';
import { Claim } from '../../_models/claim';

@Component({
  selector: 'app-claim-detail',
  templateUrl: './claim-detail.component.html',
  styleUrls: ['./claim-detail.component.css']
})
export class ClaimDetailComponent implements OnInit {
  @Input() claim?: Claim;

  ngOnInit(): void { }
}