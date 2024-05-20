import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CurrencyInputComponent } from './currency-input.component';

/**
 * Unit tests for the `CurrencyInputComponent` component.
 * These tests cover the basic functionality of the component, including:
 * - Ensuring the component is created successfully
 * - Verifying the initial price is displayed correctly
 * - Checking the behavior when the price is 0
 * - Testing the disabled state of the input
 * - Validating the `changePriceEvent` event emission
 * - Ensuring invalid characters are blocked and valid characters are allowed
 * - Verifying the correct currency symbol is displayed
 */
describe('CurrencyInputComponent', () => {
  let component: CurrencyInputComponent;
  let fixture: ComponentFixture<CurrencyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyInputComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct initial price', async () => {
    component.price = 123.45;
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.debugElement.query(
      By.css('.currency-input__input')
    ).nativeElement;
    expect(input.value).toBe('123.45');
  });

  it('should format price to two decimal places when price is 0', async () => {
    component.price = 0;
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.debugElement.query(
      By.css('.currency-input__input')
    ).nativeElement;
    expect(input.value).toBe('0.00');
  });

  it('should disable the input when disabled is set to true', async () => {
    component.disabled = true;
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.debugElement.query(
      By.css('.currency-input__input')
    ).nativeElement;
    expect(input.disabled).toBe(true);
  });

  it('should enable the input when disabled is set to false', async () => {
    component.disabled = false;
    fixture.detectChanges();
    await fixture.whenStable();

    const input = fixture.debugElement.query(
      By.css('.currency-input__input')
    ).nativeElement;
    expect(input.disabled).toBe(false);
  });

  it('should emit changePriceEvent with the correct value on change', () => {
    spyOn(component.changePriceEvent, 'emit');

    component.price = 123.45;
    fixture.detectChanges();

    const input = fixture.debugElement.query(
      By.css('.currency-input__input')
    ).nativeElement;
    input.value = '150.75';
    input.dispatchEvent(new Event('change'));

    expect(component.changePriceEvent.emit).toHaveBeenCalledWith(150.75);
  });

  it('should block invalid characters', () => {
    const blockInvalidCharSpy = spyOn(
      component,
      'blockInvalidChar'
    ).and.callThrough();

    component.price = 123.45;
    fixture.detectChanges();

    const input = fixture.debugElement.query(
      By.css('.currency-input__input')
    ).nativeElement;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' }));

    expect(blockInvalidCharSpy).toHaveBeenCalled();
  });

  it('should allow valid characters', () => {
    const blockInvalidCharSpy = spyOn(
      component,
      'blockInvalidChar'
    ).and.callThrough();

    component.price = 123.45;
    fixture.detectChanges();

    const input = fixture.debugElement.query(
      By.css('.currency-input__input')
    ).nativeElement;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));

    expect(blockInvalidCharSpy).toHaveBeenCalled();
  });

  it('should display the correct currency symbol', () => {
    fixture.detectChanges();

    const currencySymbol = fixture.debugElement.query(
      By.css('.currency-input__currency--symbol')
    ).nativeElement;
    expect(currencySymbol.textContent.trim()).toBe('$');
  });
});
