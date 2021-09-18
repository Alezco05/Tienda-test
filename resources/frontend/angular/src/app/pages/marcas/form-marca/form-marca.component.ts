import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Marca } from 'src/app/shared/models/marca';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-form-marca',
  templateUrl: './form-marca.component.html',
  styles: [],
})
export class FormMarcaComponent implements OnInit {
  unsubscribeSignal: Subject<void> = new Subject();
  myFormData: FormData = new FormData();
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormMarcaComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Marca,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.makeForm();
    this.data && this.fillData();
  }
  makeForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      referencia: ['', [Validators.required]],
    });
  }
  fillData() {
    Object.keys(this.form.controls).forEach((key) => {
      this.data[key] && this.form.get(key).setValue(this.data[key].toString());
    });
  }
  onSubmit() {
    if (this.data) this.updateProduct();
    else this.createProduct();
  }
  async updateProduct() {
    this.dataService
      .putData('marca', this.data.id, this.form.value)
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe({
        next: () =>
          this.dataService.presentSwall(
            'Exito!',
            'Dato Actualizado',
            'success',
            2000
          ),
        error: () =>
          this.dataService.presentSwall(
            'Error!',
            'Ha sucedido algo inesperado',
            'danger',
            2000
          ),
        complete: () => this.dialogRef.close(),
      });
  }
  createProduct() {
    this.dataService
      .postData('marca', this.form.value)
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe({
        next: (resp) => {
          this.dataService.presentSwall(
            'Exito!',
            'Dato Creado',
            'success',
            2000
          );
        },
        error: () =>
          this.dataService.presentSwall(
            'Error!',
            'Ha sucedido algo inesperado',
            'danger',
            2000
          ),
        complete: ()=> this.dialogRef.close()
      });
  }
}
