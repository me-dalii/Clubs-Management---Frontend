import { AbstractControl } from "@angular/forms";


export function ageRangeValidator( control: AbstractControl): { [key: string]: boolean } | null {
    let age =
      new Date().getFullYear() - new Date(control.value).getFullYear();

    if (age !== undefined && age < 18) {
      return { ageRange: true };
    }
    return null;
}