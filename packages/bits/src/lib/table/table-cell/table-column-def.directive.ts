import { CdkColumnDef } from "@angular/cdk/table";
import { Directive, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";

import { ColumnTypes } from "../public-api";
import { TableStateHandlerService } from "../table-state-handler.service";

/**
 * @ignore
 */

@Directive({
    selector: "[nuiColumnDef]",
    providers: [{ provide: CdkColumnDef, useExisting: TableColumnDefDirective }],
})
export class TableColumnDefDirective extends CdkColumnDef implements OnInit, OnChanges {
    // tslint:disable:no-input-rename
    @Input("nuiColumnDef") name: string;
    // tslint:enable:no-input-rename
    @Input() type: ColumnTypes;
    @Input() columnWidth: number;

    constructor(private tableStateHandlerService: TableStateHandlerService) {
        super();
    }

    ngOnInit() {
        if (this.columnWidth) {
            this.tableStateHandlerService.setColumnWidth(this.name, this.columnWidth);
        }

        if (this.type === "icon") {
            this.tableStateHandlerService.setAlignment(this.name, "align-center");
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.columnWidth && !changes.columnWidth.firstChange) {
            this.tableStateHandlerService.setColumnWidth(this.name, changes.columnWidth.currentValue);
        }
    }
}
