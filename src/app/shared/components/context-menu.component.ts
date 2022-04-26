import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ps-contextmenu',
  templateUrl: './../templates/context-menu.component.html'
})
export class ContextMenuComponent implements OnInit, OnChanges {
  @Input() x=0;
  @Input() y=0;
  
  leftOffset:number = 0;
  topOffset:number = 0;
  
  constructor(private el:ElementRef) { }
  
  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const rect = this.el.nativeElement.getBoundingClientRect();
    if(changes.x && (changes.x.currentValue != changes.x.previousValue)) {
      this.x = changes.x.currentValue - rect.x
    }
    if(changes.y && (changes.y.currentValue != changes.y.previousValue)) {
      this.y = changes.y.currentValue - rect.y
    }
    
  }
}
