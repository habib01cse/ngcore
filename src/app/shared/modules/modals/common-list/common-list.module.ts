import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommonListComponent } from "./common-list.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CommonImmutableListComponent } from "./common-immutable-list.component";

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CommonListComponent, CommonImmutableListComponent],
  entryComponents: [CommonListComponent, CommonImmutableListComponent]
})
export class CommonListModule {
  static components = { list: CommonListComponent, immutableList: CommonImmutableListComponent };
}