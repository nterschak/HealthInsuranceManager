export class ImportOperation<T> {
    item: T;
    status: ImportOperationStatus;

    constructor(item: T) {
        this.item = item;
        this.status = ImportOperationStatus.Ready;
    }

    import() {
        if (this.status === ImportOperationStatus.Ready || this.status === ImportOperationStatus.Failed)
            this.status = ImportOperationStatus.Uploading;
    }

    complete() {
        if (this.status === ImportOperationStatus.Uploading)
            this.status = ImportOperationStatus.Complete;
    }

    fail() {
        if (this.status === ImportOperationStatus.Uploading)
            this.status = ImportOperationStatus.Failed;
    }
}

export enum ImportOperationStatus {
    Ready,
    Uploading,
    Complete,
    Failed
}