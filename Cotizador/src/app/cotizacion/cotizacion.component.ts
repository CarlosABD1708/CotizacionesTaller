import { Component } from '@angular/core';
import { CotizadorService } from '../cotizador.service';
import * as jsPDF from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent {
  constructor(private cotizador: CotizadorService,private router: Router) { }
  cotizacion: any = {};
  id_user: string | undefined = localStorage.getItem('id')?.toString();
  agregarCotizacion() {
    console.log('Cotización Agregada:', this.cotizacion);

    this.cotizacion.estado = "Pendiente"
    // Agrega la cotización
    this.cotizador.add_cotizacion(this.cotizacion).subscribe();

   // this.generarPDF();
    // Limpia el formulario después de agregar la cotización si es necesario
    this.cotizacion = {};


    this.router.navigate(['/principal']);
  }

  generarPDF() {
    // Crea una instancia de jsPDF
    const pdf = new jsPDF.default();

    // Títulos
    pdf.setFontSize(18);
    pdf.text('Cotización de Servicio', 14, 15);

    // Contenido
    pdf.setFontSize(12);
    pdf.text('Descripción del Problema:', 14, 30);
    pdf.text(this.cotizacion.descripcionProblema, 70, 30);

    pdf.text('Modelo de Teléfono:', 14, 40);
    pdf.text(this.cotizacion.modeloTelefono, 70, 40);

    pdf.text('Monto Inicial:', 14, 50);
    pdf.text(`$${this.cotizacion.montoInicial}`, 70, 50);

    pdf.text('Adelanto:', 14, 60); // Ajusté la posición para evitar superposición
    pdf.text(`$${this.cotizacion.adelanto}`, 70, 60);

    pdf.text('Nombre del Cliente:', 14, 70);
    pdf.text(this.cotizacion.nombre, 70, 70);

    pdf.text('Número de Teléfono:', 14, 80);
    pdf.text(this.cotizacion.telefono, 70, 80);

    pdf.text('Tipo de Cotización:', 14, 90);
    pdf.text(this.cotizacion.tipoCotizacion, 70, 90);

    pdf.text('Fecha de Entrega:', 14, 100);
    pdf.text(this.cotizacion.fecha_entrega, 70, 100);

    // Guarda el PDF o abre una nueva ventana/tabla con el contenido
    pdf.save('cotizacion.pdf');
  }

}
