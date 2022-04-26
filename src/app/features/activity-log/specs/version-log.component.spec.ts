import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VersionLogComponent } from './../components/version-log.component';

describe('VersionLogComponent', () => {
  let component: VersionLogComponent;
  let fixture: ComponentFixture<VersionLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
