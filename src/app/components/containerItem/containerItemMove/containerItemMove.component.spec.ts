import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerItemsMoveComponent } from './containerItemMove.component';

describe('ContainerItemsMoveComponent', () => {
  let component: ContainerItemsMoveComponent;
  let fixture: ComponentFixture<ContainerItemsMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerItemsMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerItemsMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
