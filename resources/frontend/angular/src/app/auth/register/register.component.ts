import { Component, Inject, OnInit, Optional } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  error: number = 0;
  form: FormGroup;
  unsubscribeSignal: Subject<void> = new Subject();
  menu: any[] = JSON.parse(atob(localStorage.getItem('menu'))).menu;
  opt: any[] = JSON.parse(atob(localStorage.getItem('menu'))).opciones;
  userOpt: any[] = [];
  users: any[];
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private dataService: AuthService,
    private userServ: UserService
  ) {
    if (this.data) {
      this.userServ
        .allUsers()
        .pipe(takeUntil(this.unsubscribeSignal))
        .subscribe((resp) => (this.users = resp));
      this.dataService
        .getMenu({
          identificacion: this.data.username.toString(),
        })
        .subscribe({
          next: (menu: any) => {
            menu.opciones.forEach((opt) => {
              this.userOpt.push(opt);
            });
            this.setCheckBoxes();
          },
        });
    }
  }

  ngOnInit(): void {
    this.createForm();
    /*     setTimeout(() => {
      this.setCheckBoxes();
    }, 1000); */
  }

  setCheckBoxes() {
    this.menu.forEach((element) => {
      this.userOpt.forEach((op) => {
        if (element.idmenu == op.idmenu) {
          element['checked'] = true;
          const opciones = this.fb.group({
            idmenu: [element.idmenu, Validators.required],
            menu: [element.menu, Validators.required],
            nivel: [element.nivel, Validators.required],
            usuario: [this.form.get('name').value, Validators.required],
            identificacion: [
              this.form.get('username').value,
              Validators.required,
            ],
          });
          this.opciones.push(opciones);
        }
      });
    });
  }

  presentSwall(title, html, icon, timer) {
    Swal.fire({ title, html, icon, timer, timerProgressBar: true });
  }
  createForm() {
    this.form = this.fb.group(
      {
        id: [this.data ? this.data.id : ''],
        name: [this.data ? this.data.name : '', [Validators.required]],
        username: [this.data ? this.data.username : '', [Validators.required]],
        email: [
          this.data ? this.data.email : '',
          [Validators.required, Validators.email],
        ],
        password: ['', [Validators.required]],
        confirmedPassword: ['', [Validators.required]],
        role: [this.data ? this.data.role : '', [Validators.required]],
        opciones: this.fb.array([]),
      },
      { validator: !this.data ? this.pwdMatchValidator : null }
    );
    if (this.data) {
      this.form.removeControl('password');
      this.form.removeControl('confirmedPassword');
    }
  }
  get opciones() {
    return this.form.controls['opciones'] as FormArray;
  }
  /*   createOpciones(m, i){
    console.log(this.opciones.controls.includes(m.idnemu));
    const opciones = this.fb.group({
      idmenu: [m.idmenu, Validators.required],
      menu: [m.menu, Validators.required],
      nivel: [m.nivel, Validators.required]
    })
    this.opciones.valueChanges
    this.opciones.push(opciones)
  } */

  selectAll(e) {
    this.menu.forEach((element) => {
      element['checked'] = e.checked;
      this.onCheckChange(e, element);
    });
  }

  onCheckChange(event, m) {
    /* Selected */
    if (event.checked) {
      let principal = this.menu.filter(
        (x) => x.idmenu == `${m.idmenu.toString().charAt(0)}00`
      )[0];
      const opciones = this.fb.group({
        idmenu: [m.idmenu, Validators.required],
        menu: [m.menu, Validators.required],
        nivel: [m.nivel, Validators.required],
        usuario: [this.form.get('name').value, Validators.required],
        identificacion: [this.form.get('username').value, Validators.required],
      });

      this.opciones.push(opciones);
      if (
        this.opciones.controls.findIndex(
          (x) => x.value.idmenu == principal['idmenu']
        ) == -1
      ) {
        principal.checked = true;
        const opciones = this.fb.group({
          idmenu: [principal['idmenu'], Validators.required],
          menu: [principal['menu'], Validators.required],
          nivel: [principal['nivel'], Validators.required],
          usuario: [this.form.get('name').value, Validators.required],
          identificacion: [
            this.form.get('username').value,
            Validators.required,
          ],
        });
        this.opciones.push(opciones);
      }
    } else {
      this.opciones.controls.forEach((element, i) => {
        if (element.value.idmenu == m.idmenu) {
          this.opciones.removeAt(i);
        }
      });
    }
  }

  onCheckChangeAll(event, m) {
    this.menu.forEach((element) => {
      if (event.checked) {
        if (element.idmenu >= m.idmenu && element.idmenu <= m.idmenu + 99) {
          element['checked'] = true;
          const opciones = this.fb.group({
            idmenu: [element.idmenu, Validators.required],
            menu: [element.menu, Validators.required],
            nivel: [element.nivel, Validators.required],
            usuario: [this.form.get('name').value, Validators.required],
            identificacion: [
              this.form.get('username').value,
              Validators.required,
            ],
          });
          this.opciones.push(opciones);
        }
      } else {
        if (element.idmenu >= m.idmenu && element.idmenu <= m.idmenu + 99) {
          element['checked'] = false;
          this.opciones.controls.forEach((x, i) => {
            x.value.idmenu >= m.idmenu && x.value.idmenu <= m.idmenu + 99
              ? this.opciones.removeAt(i)
              : null;
          });
        }
      }
    });
  }

  pwdMatchValidator(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('confirmedPassword').value) {
      return { invalid: true };
    }
  }

  setPass() {
    this.form.get('password').setValue('Usuario365@');
    this.form.get('confirmedPassword').setValue('Usuario365@');
  }

  onSubmitForm() {
    Swal.fire({
      title: 'Creando Usuario...',
      html: '<h3>Esto puede tardar varios segundos</h3>',
      showConfirmButton: false,
      willOpen() {
        Swal.showLoading();
      },
      didClose() {
        Swal.hideLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
    this.dataService
      .signup(this.form.value)
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe({
        next: (resp) => {
          this.dialogRef.close(resp);
          this.presentSwall(
            '¡Exito!',
            'Usuario Creado Exitosamente',
            'error',
            3000
          );
        },
        error: () =>
          this.presentSwall('¡Error!', 'EROR INTERNO.', 'error', 3000),
        complete: () => Swal.close(),
      });
  }
  onSubmitEditForm() {
    Swal.fire({
      title: 'Actualizando Usuario...',
      html: '<h3>Esto puede tardar varios segundos</h3>',
      showConfirmButton: false,
      willOpen() {
        Swal.showLoading();
      },
      didClose() {
        Swal.hideLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
    this.userServ
      .updateKontrolUser(this.form.value)
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe({
        next: (resp) => {
          this.dialogRef.close(resp);
          this.presentSwall(
            '¡Exito!',
            'Usuario Actualizado Exitosamente',
            'error',
            3000
          );
        },
        error: () =>
          this.presentSwall('¡Error!', 'ERROR INTERNO.', 'error', 3000),
        complete: () => Swal.close(),
      });
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    // Don't forget to unsubscribe from subject itself
    this.unsubscribeSignal.unsubscribe();
  }
}
