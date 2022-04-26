/* angular stuff */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
/* our own stuff */
import { DdlSelectedTextDirective } from './directives/ddl-selected-text.directive';
import { FilterPipe } from './pipes/filter.pipe';
import { TinyPipe } from './pipes/tinyString.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { PsClickDirective } from './directives/validators/ps-click.directive';
import { PsValidateDirective } from './directives/validators/ps-validate.directive';
import { PsSelectAllDirectives } from './directives/ps-select-all.directives';
import { SlideHideShowDirective } from './directives/animations/slide-hide-show.directive';
import { PSDecimalPrecisionDirective } from './directives/ps-decimal/ps-decimal.directive';
import { ToolTipDirective } from './directives/ps-tooltip/ps-tooltip.directive';
import { NavSwitchComponent } from './components/nav-switch.component';
import { NavModuleSwitchComponent } from './components/nav-module-switch.component';
import { PsiValdatationOptionDirective } from './directives/validators/psi-valdatation-option.directive';
import { PsiValidateDirective } from './directives/validators/psi-validate.directive';
import { VendorModule } from './vendor/vendor.module';
import { NumberToWordsPipe } from './pipes/number-to-words.pipe';
import { ButtonRendererComponent } from './components/button-renderer.component';
import { SelectRendererComponent } from './components/select-renderer.component';
import { AgGridFilterComponent } from './components/ag-grid-filter.component';
// import { AgGridModule } from 'ag-grid-angular';
import { DatePipeRendererComponent } from './components/date-pipe-renderer.component';
import { NumberPipeRendererComponent } from './components/number-pipe-renderer.component';
import { ModalButtonRendererComponent } from './components/modal-button-renderer.component';
import { DateTimePipeRendererComponent } from './components/date-time-pipe-renderer.component';
import { NavDropdonwnComponent } from './components/nav-dropdonwn.component';
import { NavModuleLinkComponent } from './components/nav-module-link.component';
import { PsValidateGridDirective } from './directives/validators/ps-validate-grid.directive';
import { MasterActionComponent } from './components/master-action.component';
import { DateCellEditorComponent } from './components/date-cell-editor.component';
import { NumericCellEditorComponent } from './components/numeric-cell-editor.component';
import { DecimalCellEditorComponent } from './components/decimal-cell-editor.component';
import { PsNumberDirective } from './directives/ps-number/ps-number.directive';
import { NumericPipeRendererComponent } from './components/numeric-pipe-renderer.component';
import { SelectCellEditorComponent } from './components/select-cell-editor.component';
import { LinkCellRendererComponent } from './components/link-cell-renderer.component';
import { ModalCellEditorComponent } from './components/modal-cell-editor.component';
import { ModalAndTextCellEditorComponent } from './components/modal-and-text-cell-editor.component';
import { CheckboxRendererComponent } from './components/checkbox-renderer.component';
import { CheckboxCellEditorComponent } from './components/checkbox-cell-editor.component';
import { RadioCellEditorComponent } from './components/radio-cell-editor.component';
import { RadioRendererComponent } from './components/radio-renderer.component';
import { PsDatepickerDirective } from './directives/ps-datepicker.directive';
import { PsDatepickerInputDirective } from './directives/ps-datepicker-input.directive';
import { PsInputMaxDirective } from './directives/ps-input-max.directive';
import { NgSelectWrapperDirective } from './directives/ng-select-wrapper.directive';
import { CheckboxCellHeaderComponent } from './components/checkbox-header.component';
import { PsModalComponent } from './components/ps-modal.component';
import { TextCellEditorComponent } from './components/text-cell-editor.component';
import { TimeCellEditorComponent } from './components/time-cell-editor.component';
import { TimePipeRendererComponent } from './components/time-pipe-renderer.component';
import { TextCellRendererComponent } from './components/text-cell-renderer.component';
import { CompanyChangeComponent } from './components/company-change.component'; 
import { AppFooterComponent } from './components/app-footer.component';
import { AppHeaderComponent } from './components/app-header.component';
import { ContextMenuComponent } from './components/context-menu.component';
import { HeaderCustomCheckboxRenderer } from './components/header-custom-checkbox-component';
import { TabIndexSetComponent } from './components/tab-index-set.component';
import { CanDeactivateGuard } from '../core/guards/can-deactivate/can-deactivate.guard';
import { DateTimeCellEditorComponent } from './components/date-time-cell-editor.component';
import { PsSelectAllFocusDirectives } from './directives/ps-select-all-focus.directives';
import { ButtonCellEditorComponent } from './components/button-cell-editor.component';
import { SliderFloatingFilter } from './components/slider-floating-filter.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { ClientSideRowModelModule, CsvExportModule, InfiniteRowModelModule, ModuleRegistry } from '@ag-grid-community/all-modules';
import { HighlightDirective } from './directives/highlight.directive';
@NgModule({
    declarations: [
        DdlSelectedTextDirective
        , PsModalComponent
        , FilterPipe
        , TinyPipe
        , SafePipe
        , HighlightDirective
        , PsClickDirective
        , PsValidateDirective
        , PsValidateGridDirective
        , PsSelectAllDirectives
        , PsSelectAllFocusDirectives
        , SlideHideShowDirective
        , PSDecimalPrecisionDirective
        , ToolTipDirective
        , NavSwitchComponent
        , NavModuleSwitchComponent
        , NumberToWordsPipe
        , PsiValdatationOptionDirective
        , PsNumberDirective
        , PsiValidateDirective
        , AgGridFilterComponent
        , ButtonRendererComponent
        , SelectRendererComponent
        , CheckboxRendererComponent
        , CheckboxCellEditorComponent
        , RadioCellEditorComponent
        , RadioRendererComponent
        , ModalCellEditorComponent
        , ModalAndTextCellEditorComponent
        , LinkCellRendererComponent
        , SelectCellEditorComponent
        , DatePipeRendererComponent
        , NumberPipeRendererComponent
        , NumericPipeRendererComponent
        , ModalButtonRendererComponent
        , DateTimePipeRendererComponent
        , NumericCellEditorComponent
        , TextCellEditorComponent
        , TextCellRendererComponent
        , DecimalCellEditorComponent
        , DateCellEditorComponent
        , DateTimeCellEditorComponent
        , TimeCellEditorComponent
        , NavDropdonwnComponent
        , NavModuleLinkComponent
        , TimePipeRendererComponent
        , MasterActionComponent
        , PsDatepickerInputDirective
        , PsDatepickerDirective
        , PsInputMaxDirective
        , NgSelectWrapperDirective
        , CheckboxCellHeaderComponent
        , CompanyChangeComponent
        , AppFooterComponent
        , AppHeaderComponent
        , ContextMenuComponent
        , HeaderCustomCheckboxRenderer
        , TabIndexSetComponent
        , ButtonCellEditorComponent
        , SliderFloatingFilter


    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        VendorModule,
        AgGridModule.withComponents([ButtonRendererComponent, ButtonCellEditorComponent, CheckboxRendererComponent, CheckboxCellEditorComponent, RadioCellEditorComponent, RadioRendererComponent, SelectRendererComponent, SelectCellEditorComponent, LinkCellRendererComponent, ModalCellEditorComponent, ModalAndTextCellEditorComponent ,DatePipeRendererComponent, DateTimePipeRendererComponent, ModalButtonRendererComponent, NumberPipeRendererComponent, NumericPipeRendererComponent, TimePipeRendererComponent, NumericCellEditorComponent, TextCellEditorComponent, TextCellRendererComponent, DecimalCellEditorComponent, DateCellEditorComponent, TimeCellEditorComponent, CheckboxCellHeaderComponent, HeaderCustomCheckboxRenderer, DateTimeCellEditorComponent, SliderFloatingFilter]),

    ],
    exports: [
        CommonModule
        , FormsModule
        , PsModalComponent
        , AgGridModule
        , AgGridFilterComponent
        , FilterPipe
        , TinyPipe
        , SafePipe
        , HighlightDirective
        , PsClickDirective
        , PsValidateDirective
        , PsValidateGridDirective
        , PsSelectAllDirectives
        , SlideHideShowDirective
        , PSDecimalPrecisionDirective
        , PsNumberDirective
        , NumberToWordsPipe
        , ToolTipDirective
        , NavSwitchComponent
        , NavModuleSwitchComponent
        , PsiValdatationOptionDirective
        , PsiValidateDirective
        , NavDropdonwnComponent
        , NavModuleLinkComponent
        , MasterActionComponent
        , PsDatepickerInputDirective
        , PsDatepickerDirective
        , PsInputMaxDirective
        , NgSelectWrapperDirective
        , CompanyChangeComponent
        , AppFooterComponent
        , AppHeaderComponent
        , ContextMenuComponent
        , TabIndexSetComponent
        , PsSelectAllFocusDirectives
        
    ],
    providers: [
        CanDeactivateGuard,
    ]
})
export class SharedModule {
    constructor() {
        ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule, InfiniteRowModelModule]);
    }

}
