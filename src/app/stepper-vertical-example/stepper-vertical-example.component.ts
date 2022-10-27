import { StepperOrientation } from '@angular/cdk/stepper';
import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'stepper-vertical-example',
  templateUrl: 'stepper-vertical-example.component.html',
  styleUrls: ['stepper-vertical-example.component.css'],
})
export class StepperVerticalExample implements OnInit{
  private trigger: Subject<any> = new Subject();

  orientationCuston: StepperOrientation = "vertical";
  cameraSize: number = 300;
  images: string[] = [];
  isLinear = true;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.orientationCuston = (window.innerWidth > 600) ? "horizontal" : "vertical";
    this.cameraResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.cameraResize();
  }

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

  private cameraResize() {
    this.cameraSize = window.innerWidth * 0.75
    if (this.cameraSize > 480) this.cameraSize = 480;
    if (this.cameraSize < 300) this.cameraSize = 300;
  }
}
