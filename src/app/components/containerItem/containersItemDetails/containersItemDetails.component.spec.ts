import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerItemsDetailsComponent } from './containersItemDetails.component';

describe('ContainerItemsDetailsComponent', () => {
  let component: ContainerItemsDetailsComponent;
  let fixture: ComponentFixture<ContainerItemsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerItemsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerItemsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
