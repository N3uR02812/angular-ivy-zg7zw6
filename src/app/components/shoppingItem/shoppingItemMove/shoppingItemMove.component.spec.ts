import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingItemMoveComponent } from './shoppingItemMove.component';

describe('ShoppingItemMoveComponent', () => {
  let component: ShoppingItemMoveComponent;
  let fixture: ComponentFixture<ShoppingItemMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingItemMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingItemMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
