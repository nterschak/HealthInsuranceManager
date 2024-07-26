import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Claim } from 'src/app/_models/claim';
import { ImportOperation, ImportOperationStatus } from 'src/app/_models/ImportOperation';

@Component({
  selector: 'app-claim-import-table',
  templateUrl: './claim-import-table.component.html',
  styleUrls: ['./claim-import-table.component.css']
})
export class ClaimImportTableComponent {
  @Input() operations!: ImportOperation<Claim>[];
  @Output() import = new EventEmitter<ImportOperation<Claim>>();

  importClaim(operation: ImportOperation<Claim>) {
    this.import.emit(operation);
  }

  getButtonClass(operation: ImportOperation<Claim>) {
    if (operation.status === ImportOperationStatus.Uploading)
      return 'btn-warning';
    if (operation.status === ImportOperationStatus.Failed)
      return 'btn-danger';
    if (operation.status === ImportOperationStatus.Ready)
      return 'btn-secondary';
    return 'btn-success';
  }
}
