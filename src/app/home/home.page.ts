import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;

  constructor() {}
  ngOnInit() {}

  ionViewDidEnter() {
    // Inisialisasi peta dengan tampilan default
    this.map = L.map('mapId').setView([-7.7701778, 110.377862], 15);

    // Base layer OpenStreetMap
    const openStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Base layer Google Streets
    const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: 'Map data © Google',
      detectRetina: true
    });

    // Base layer Google Satellite
    const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: 'Satellite data © Google',
      detectRetina: true
    });

    // Base layer CartoDB Positron
    const cartoDB = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
    });

    // Base layer Stamen Toner
    const stamenToner = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://stamen.com/">Stamen Design</a>'
    });

    // Tambahkan OpenStreetMap sebagai layer default
    openStreetMap.addTo(this.map);

    // Tambahkan kontrol layer untuk mengganti base map
    L.control.layers({
      'OpenStreetMap': openStreetMap,
      'Google Streets': googleStreets,
      'Google Satellite': googleSat,
      'CartoDB Positron': cartoDB,
      'Stamen Toner': stamenToner
    }).addTo(this.map);

    // Buat ikon kustom menggunakan gambar dari URL
    const gspIcon = L.icon({
      iconUrl: 'https://residence.ugm.ac.id/wp-content/uploads/sites/1094/2023/05/gedung-gsp-768x388.jpg',
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50]
    });

    // Tambahkan marker dengan ikon kustom
    const marker = L.marker([-7.7701778, 110.377862], { icon: gspIcon }).addTo(this.map);

    // Tambahkan pop-up ke marker
    marker.bindPopup("<b>Grha Sabha Pramana (GSP)</b><br>Universitas Gadjah Mada.").openPopup();
  }
}
