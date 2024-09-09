import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-custom-checkbox',
  standalone: true,
  imports: [],
  template: `<input
    [value]="value"
    (change)="onChange()"
    type="checkbox"
    [disabled]="disabled"
  >`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCheckboxComponent),
      multi: true,
    }
  ]
})
export class CustomCheckboxComponent implements ControlValueAccessor {
  value = false;
  disabled = false;

  private onTouch = () => {};
  private _onChangeCb = (val: boolean) => {};

  onChange() {
    this.value = !this.value;
    this._onChangeCb(this.value);
  };
  registerOnChange(fn: () => void): void {
    this._onChangeCb = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(val: boolean): void {
    this.value = val;
  }
}
