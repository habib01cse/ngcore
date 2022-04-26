import { Injectable } from '@angular/core';
import { ButtonRendererComponent } from '../components/button-renderer.component';
import { SelectRendererComponent } from '../components/select-renderer.component';
import { DatePipeRendererComponent } from '../components/date-pipe-renderer.component';
import { NumberPipeRendererComponent } from '../components/number-pipe-renderer.component';
import { ModalButtonRendererComponent } from '../components/modal-button-renderer.component';
import { DateTimePipeRendererComponent } from '../components/date-time-pipe-renderer.component';
import { DateCellEditorComponent } from '../components/date-cell-editor.component';
import { NumericCellEditorComponent } from '../components/numeric-cell-editor.component';
import { DecimalCellEditorComponent } from '../components/decimal-cell-editor.component';
import { NumericPipeRendererComponent } from '../components/numeric-pipe-renderer.component';
import { SelectCellEditorComponent } from './../components/select-cell-editor.component';
import { ModalCellEditorComponent } from '../components/modal-cell-editor.component';
import { ModalAndTextCellEditorComponent } from '../components/modal-and-text-cell-editor.component';
import { CheckboxRendererComponent } from '../components/checkbox-renderer.component';
import { CheckboxCellEditorComponent } from '../components/checkbox-cell-editor.component';
import { RadioRendererComponent } from '../components/radio-renderer.component';
import { RadioCellEditorComponent } from '../components/radio-cell-editor.component';
import { CheckboxCellHeaderComponent } from '../components/checkbox-header.component';
import { TextCellEditorComponent } from '../components/text-cell-editor.component';
import { TimeCellEditorComponent } from '../components/time-cell-editor.component';
import { TimePipeRendererComponent } from '../components/time-pipe-renderer.component';
import { TextCellRendererComponent } from '../components/text-cell-renderer.component';
import { LinkCellRendererComponent } from '../components/link-cell-renderer.component';
import { HeaderCustomCheckboxRenderer } from '../components/header-custom-checkbox-component';
import { DateTimeCellEditorComponent } from '../components/date-time-cell-editor.component';
import { ButtonCellEditorComponent } from '../components/button-cell-editor.component';
import { SliderFloatingFilter } from '../components/slider-floating-filter.component';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  frameworkComponents = {
    buttonRenderer: ButtonRendererComponent,
    selectRenderer: SelectRendererComponent,
    selectCellEditor: SelectCellEditorComponent,
    checkboxRenderer: CheckboxRendererComponent,
    checkboxCellEditor: CheckboxCellEditorComponent,
    radioRenderer: RadioRendererComponent,
    radioCellEditor: RadioCellEditorComponent,
    modalCellEditor: ModalCellEditorComponent,
    modalAndTextCellEditor: ModalAndTextCellEditorComponent,
    linkCellRenderer: LinkCellRendererComponent,
    datePipeRenderer: DatePipeRendererComponent,
    dateTimePipeRenderer: DateTimePipeRendererComponent,
    dateCellEditor: DateCellEditorComponent,
    dateTimeCellEditor: DateTimeCellEditorComponent,
    numberPipeRenderer: NumberPipeRendererComponent,
    numericPipeRenderer: NumericPipeRendererComponent,
    numericCellEditor: NumericCellEditorComponent,
    modalButtonRenderer: ModalButtonRendererComponent,
    timeCellEditor: TimeCellEditorComponent,
    timePipeRenderer: TimePipeRendererComponent,
    textCellEditor: TextCellEditorComponent,
    textCellRenderer: TextCellRendererComponent,
    decimalCellEditor: DecimalCellEditorComponent,
    checkboxHeaderComponent: CheckboxCellHeaderComponent,
    headerCustomCheckboxRenderer: HeaderCustomCheckboxRenderer,
    buttonCellEditorComponent: ButtonCellEditorComponent,
    sliderFloatingFilter: SliderFloatingFilter,
  }

  constructor() { }
  getColumnDefs(items, gridId='columnDefs') {
    if(localStorage.getItem(gridId)) {
      const saveItems = JSON.parse(localStorage.getItem(gridId));
      let resultItems = [];
      saveItems.forEach(element => {
        const colItem = this.getColumn(items, element.colId);
        if(colItem){
          resultItems.push(Object.assign(colItem, element));
        }
      });
      return resultItems;
    }
    else return items;
  }

  sizeColumnsToFit(grid, gridId='columnDefs') {
    grid.api.sizeColumnsToFit();
  }

  getColumn(items, colId) {
    const found = items.find(function(element) {
      return element.field===colId;
    });
    return found;
  }


  public startWithFilterParams = {
    filterOptions: ['contains', 'startsWith', 'endsWith'],
    defaultOption: 'startsWith',
    enableSorting: true,
    textCustomComparator: function (filter , value, filterText) {
      var filterTextLowerCase = filterText.toLowerCase();
      var valueLowerCase = value.toString().toLowerCase();
      
      switch (filter) {
        case 'contains':
          return valueLowerCase.indexOf(filterTextLowerCase) >= 0;
        case 'notContains':
          return valueLowerCase.indexOf(filterTextLowerCase) === -1;
        case 'equals':
          return valueLowerCase === filterTextLowerCase;
        case 'notEqual':
          return valueLowerCase != filterTextLowerCase;
        case 'startsWith':
          let strArr = valueLowerCase.split(" ");
          let len = strArr.length;
          let flag = false;
          for( let i=0 ; i< len ; i++ ){
            console.log(strArr[i] + "-" + filterTextLowerCase);
            if( strArr[i].indexOf(filterTextLowerCase) === 0 ){
              flag = true;
              break;
            }
          }

          var index = valueLowerCase.lastIndexOf(filterTextLowerCase);
          if( !flag && valueLowerCase.lastIndexOf(filterTextLowerCase) >= 0 && index === (valueLowerCase.length - filterTextLowerCase.length) ){
            flag = true;
          }

          return flag;
          
        case 'endsWith':
          var index = valueLowerCase.lastIndexOf(filterTextLowerCase);
          return index >= 0 && index === (valueLowerCase.length - filterTextLowerCase.length);
        default:
          // should never happen
          console.warn('invalid filter type ' + filter);
          return false;
      }

    },
  };

}
