import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { Producto } from 'src/app/shared/models/productos';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css'],
})
export class FormProductoComponent implements OnInit {
  myFormData: FormData = new FormData();
  form: FormGroup;
  tallas: string[] = ['S','M','L','XL','XLL'];
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FormProductoComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Producto,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('es');
    this.dateAdapter.getFirstDayOfWeek = () => 1;
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
      cantidad: ['', [Validators.required]],
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
}
