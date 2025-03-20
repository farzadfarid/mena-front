import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectCompanyOrPersonalComponent } from './select-company-or-personal.component';

describe('SelectCompanyOrPersonalComponent', () => {
  let component: SelectCompanyOrPersonalComponent;
  let fixture: ComponentFixture<SelectCompanyOrPersonalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCompanyOrPersonalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCompanyOrPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
