import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'stepper-vertical-example',
  templateUrl: 'stepper-vertical-example.component.html',
  styleUrls: ['stepper-vertical-example.component.css'],
})
export class StepperVerticalExample {
  private trigger: Subject<any> = new Subject();
  images: string[] = [];


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  constructor(private _formBuilder: FormBuilder) {}

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.images.push(webcamImage!.imageAsDataUrl)
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  sendForm() {}

}
