import { Component, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styles: [
  ]
})
export class RuletaComponent {
  giros: number = 0;
  vueltas = 3;
  valor: any;
  @ViewChild('ruleta') ruleta!: ElementRef;
  @ViewChild('audio') audio!: ElementRef;
  @ViewChild('audio2') audio2!: ElementRef;

  constructor() { }

  girar() {
    if (this.giros < this.vueltas) {
      let rand = Math.random() * 7200;
      this.calcular(rand);
      this.giros++;
      this.audio.nativeElement.play();
    }
  }

  premio(premios: any) {
    if (this.giros === this.vueltas) {
      if (premios !== '¡Quiebra!') {
        Swal.fire({
          icon: 'success',
          title: `Usted Gano ${premios}`,
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value == true) {
            this.giros = 0;
            location.reload();
          }
        });
      }else{
        Swal.fire({
          imageUrl: '../../../assets/images/llorando.png',
          imageWidth: 256,
          imageHeight: 256,
          title: `Acaba de quedar en ${premios}`,
          confirmButtonText: 'Aceptar',
          allowOutsideClick: false
        }).then((result) => {
          if (result.value == true) {
            this.giros = 0;
            location.reload();
          }
        });
        this.audio2.nativeElement.play();
      }
    }else{
      if (premios === '¡Quiebra!'){
        Swal.fire({
          icon: 'info',
          title: 'Tiene un turno mas!!!'
        });
      }else{
        Swal.fire({
          icon: 'question',
          title: `Quiere Reclamar El Premio ${premios}???`,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Continuar Jugando',
          showCancelButton: true,
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: `Su premio es ${premios}`,
              text: 'Vuelva A Jugar Pronto!!',
              confirmButtonText: 'Aceptar',
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                location.reload();
              }
            });
          }
        });
      }
    }
  }

  calcular(rand: number) {
    this.valor = rand / 360;
    this.valor = (this.valor - parseInt(this.valor.toString().split(".")[0])) * 360;

    this.ruleta.nativeElement.style.transform = `rotate(${rand}deg)`;

    setTimeout(() => {
      switch (true) {
        case this.valor > 0 && this.valor <= 36:
          this.premio('¡Quiebra!');
          break;
        case this.valor > 36 && this.valor <= 72:
          this.premio('¡¡Televisor!!');
          break;
        case this.valor > 72 && this.valor <= 108:
          this.premio('¡¡Bicicleta!!');
          break;
        case this.valor > 108 && this.valor <= 144:
          this.premio('¡¡IPhone 13 Pro Max!!');
          break;
        case this.valor > 144 && this.valor <= 180:
          this.premio('¡¡Rolex!!');
          break;
        case this.valor > 180 && this.valor <= 216:
          this.premio('¡Quiebra!');
          break;
        case this.valor > 216 && this.valor <= 252:
          this.premio('¡¡Play Station 5!!');
          break;
        case this.valor > 252 && this.valor <= 288:
          this.premio('¡¡Airpods!!');
          break;
        case this.valor > 288 && this.valor <= 324:
          this.premio('¡¡Viajes!!');
          break;
        case this.valor > 324 && this.valor <= 360:
          this.premio('¡¡Auto del año!!');
          break;
      }
    }, 5000);
  }
}
