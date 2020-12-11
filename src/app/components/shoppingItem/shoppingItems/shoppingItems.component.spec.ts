import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerItemsComponent } from './containersItems.component';

describe('ContainerItemsComponent', () => {
  let component: ContainerItemsComponent;
  let fixture: ComponentFixture<ContainerItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
