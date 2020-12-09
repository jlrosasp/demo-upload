import { Component } from '@angular/core';
import { UploadService } from './services/upload.service';

// PNotify Imports
// import {notice, defaultModules, Notice, ModuleEntry} from '@pnotify/core/index';
// import * as PNotifyConfirm from '@pnotify/confirm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  /**
   * Constructor
   */
  constructor(private uploadSvc: UploadService) { }

  // Properties
  title = 'dropzone';
  formData = new FormData();
  files: File[] = [];
  isLoadingFile: boolean = false;
  loadingTitle: string = '';
  validateMessage:string[] = [];
  urlBase = '';
  filesData:any = {};

  // DropZone Events
  async onSelect(event) {
    this.files.push(...event.addedFiles);
  }
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }
  // Drop Zone Validations
  validateMinFiles() {
    let blnReturn: boolean = true;

    if(this.files.length < 1){
      blnReturn = false;
      this.validateMessage[0] = `
      <b>Recuerde</b> que es necesario anexar el <b>Documento</b> 
      en formato <b>PDF</b> (*.pdf), o bien en formato tipo <b>Imágen</b> (*.png|*.jpg) 
      para poder completar su solicitud.
      `;
    }
    return blnReturn;
  }
  validateExtensionsFiles() {
    let blnReturn: boolean = true;

    if (this.files.length == 1) {
      let extFile = this.files[0].name.split('.').pop();
      if (extFile != 'pdf' && extFile != 'png' && extFile != 'jpg') {
        blnReturn = false;
        this.validateMessage[1] = `
        El tipo de archivo seleccionado <b>NO es valido</b>. 
        Solo es permitido archivos en <b>formato PDF</b> (*.pdf) 
        y tipo <b>Imágen</b> (*.png|*.jpg) 
        `;
      }
    }
    return blnReturn;
  }
  // Businnes Logic Rules
  uploadFiles() {
    // Files Form Data
    this.files.forEach(file => {
      this.formData.append("attachments", file);
    });

    // Import Action
    this.isLoadingFile = true;
    this.loadingTitle = `Cargando ${this.files.length} Archivo(s)`;
    
    this.uploadSvc.uploadFiles(this.formData)
      .subscribe((result: any) => {
        // Not Loading
        this.isLoadingFile = false;
        // Clean Controls
        this._cleanFormData();
        // Get Data
        this.filesData = result
        // Show Alert
        // notice({
        //   text: "I'm a notice with modules, and my module options are checked by TypeScript.",
        //   modules: new Map([
        //     // This requires `"downlevelIteration": true` in your TypeScript config.
        //     ...defaultModules,
        //     [PNotifyConfirm, {
        //       confirm: true,
        //       buttons: [{
        //         text: 'Ok',
        //         primary: true,
        //         click: (notice: Notice) => notice.close()
        //       }]
        //       // ***
        //       // Notice the type assertion here. It tells TypeScript that the options
        //       // are for the Confirm module.
        //       // ***
        //     }] as ModuleEntry<typeof PNotifyConfirm>,
        //   ])
        // });
        // Show Attachments
        
      }, (err: any) => {
        console.log('Error al intentar importar el archivo:', err);
        
        // Clean Controls
        this._cleanFormData();
      });
  }

  // Private Functions and Methods
  private _cleanFormData() {
    this.files = [];
    this.isLoadingFile = false;
    this.formData = new FormData();
  }
}