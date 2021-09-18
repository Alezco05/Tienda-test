import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { FileValidator } from 'ngx-material-file-input';
import { Subject, takeUntil } from 'rxjs';
import { Marca } from 'src/app/shared/models/marca';
import { Producto } from 'src/app/shared/models/productos';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css'],
})
export class FormProductoComponent implements OnInit {
  unsubscribeSignal: Subject<void> = new Subject();
  myFormData: FormData = new FormData();
  form: FormGroup;
  tallas: string[] = ['S', 'M', 'L', 'XL', 'XLL'];
  marcas: Marca[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormProductoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Producto,
    private dateAdapter: DateAdapter<Date>,
    private dataService: DataService
  ) {
    this.dateAdapter.setLocale('es');
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    this.dataService.getAllData('getMarcas',)
    .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
    .subscribe({
      next: (resp: Marca[]) => this.marcas = resp,
    });
   
  }

  ngOnInit(): void {
    this.makeForm();
    this.data && this.fillData();
  }
  makeForm() {
    this.form = this.formBuilder.group({
      file: ['', [FileValidator.maxContentSize(300000)]],
      nombreProducto: ['', [Validators.required, Validators.maxLength(100)]],
      talla: ['', [Validators.required]],
      marca_id: ['', [Validators.required]],
      observaciones: ['', [Validators.required, Validators.maxLength(250)]],
      cantidad: [
        0,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      fechaEmbarque: ['', [Validators.required]],
    });
  }
  fillData() {
    Object.keys(this.form.controls).forEach((key) => {
      this.data[key] && this.form.get(key).setValue(this.data[key].toString());
    });
    this.form.get('file').setValidators(null);
  }
  fileEvent(event): void {
    try {
      this.myFormData = new FormData();
      const files = event.target.files;
      this.myFormData.append('image', files[0]);
    } catch {}
  }
  onSubmit() {
    const data: Producto = { ...this.form.value };
    data['fechaEmbarque'] = moment(this.form.get('fechaEmbarque').value).format(
      'YYYY-MM-DD'
    );
    if (this.data) this.updateProduct(data);
    else this.createProduct(data);
  }
  async updateProduct(data: Producto) {
    await this.uploadFile(this.data.id);
    this.dataService
      .putData('producto', this.data.id, data)
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
  createProduct(data) {
    this.dataService
      .postData('producto', data)
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe({
        next: async (resp: Producto) => {
          await this.uploadFile(resp.id);
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
      });
  }
  async uploadFile(id) {
    this.myFormData.append('id', id);
    if (this.form.get('file').value != '') {
      await this.dataService
        .uploadImage('productoImg', this.myFormData)
        .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
        .subscribe(console.log);
    }
    return;
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
