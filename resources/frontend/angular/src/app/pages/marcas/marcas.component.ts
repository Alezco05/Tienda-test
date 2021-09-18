import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Marca } from 'src/app/shared/models/marca';
import { Usuario } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataService } from 'src/app/shared/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styles: [],
})
export class MarcasComponent implements OnInit, OnDestroy {
  unsubscribeSignal: Subject<void> = new Subject();
  marcas: Marca[] = [];
  p: number = 1;
  usuario: Usuario;
  filterPost: string = '';
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.usuario = this.authService.usuario;
    this.getMarcas();
  }

  ngOnInit(): void {}
  getMarcas() {
    this.dataService
      .getAllData('getMarcas')
      .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
      .subscribe({
        next: (resp: Marca[]) => (this.marcas = resp),
      });
  }
  deleteMarca(e: Marca) {
    Swal.fire({
      title: 'Se desactivara la siguiente marca',
      text: `${e.nombre} - ${e.referencia}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService
          .deleteData('marca', e.id)
          .pipe(takeUntil(this.unsubscribeSignal.asObservable()))
          .subscribe({
            next: () =>
              Swal.fire('¡Listo!', 'Se desactivo de la BD', 'success').then(
                () => {
                  this.getMarcas();
                }
              ),
            error: () =>
              Swal.fire('ERROR!', 'Algo ha fallado intente mas tarde', 'error'),
          });
      }
    });
  }
  async openModal(data?) {
    const { FormMarcaComponent } = await import(
      './form-marca/form-marca.component'
    );
    const dialogRef = this.dialog.open(FormMarcaComponent, {
      width: '800px',
      height: '100%',
      data,
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribeSignal))
      .subscribe(() => {
        this.getMarcas();
      });
  }
  ngOnDestroy(): void {
    this.unsubscribeSignal.next();
    this.unsubscribeSignal.unsubscribe();
  }
}
