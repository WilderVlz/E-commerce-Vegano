import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[messageError]'
})
export class MessageErrorDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _errors?: ValidationErrors | null;

  @Input() set errors(value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage();
  }

  @Input()
  fieldName?: string = '';

  constructor( private el: ElementRef<HTMLElement> ) {
    // console.log('constructor de la directiva')
    // console.log(el);
    this.htmlElement = el;
  }

  ngOnInit(): void {
    this.setStyle();
  }


  setStyle():void {
    if ( !this.htmlElement ) return;

    this.htmlElement!.nativeElement.style.color = 'red';
  }

  setErrorMessage():void {
    if ( !this.htmlElement )return;
    if ( !this._errors ) {
      console.log("_errors =>", this._errors)
      this.htmlElement.nativeElement.innerText = '';
      return;
    }

    const errors = Object.keys(this._errors);
    console.log("errors =>", errors)

    //if(this.myForm.controls[field].touched)

    if ( errors.includes('required') )  {
      this.htmlElement.nativeElement.innerText = `El campo ${this.fieldName} es requerido.`;
      return;
    }

    if ( errors.includes('ngbDate') )  {
      this.htmlElement.nativeElement.innerText = `El formato de la ${this.fieldName} es inválido o la fecha no existe.`;
      return;
    }

    if ( errors.includes('dateComparison') )  {
      this.htmlElement.nativeElement.innerText = `La fecha de vencimiento debe ser mayor a la fecha de emisión.`;
      return;
    }

    if ( errors.includes('minlength') )  {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];

      this.htmlElement.nativeElement.innerText = `Mínimo ${current}/${ min } caracteres.`;
      return;
    }

    if ( errors.includes('email') )  {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo.';
      return;
    }

    if ( errors.includes('notEqual') )  {
      this.htmlElement.nativeElement.innerText = 'Las contraseñas deben ser iguales';
      return;
    }

  }

}
