import { Component } from "@angular/core";

@Component({
    selector: "nui-busy-visual",
    templateUrl: "./busy-visual-test.component.html",
    styleUrls: [
        "./busy-visual-test.component.less",
    ],
})
export class BusyVisualTestComponent {
    public busy: boolean;

    public switchBusy() {
        this.busy = !this.busy;
    }
}
