import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  formIsNotValid = true;
  formMode = false;
  isLoading = false;
  errorMessage = null;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.loginForm.statusChanges.subscribe(
      value => {
        this.formIsNotValid = value == 'VALID' ?  false : true;
      }
    )
  }

  swithchMode(){
    this.formMode = !this.formMode;
  }

  onHandleError(){
    this.errorMessage = null;
  }

  showErrorAlert(message: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const cmpRef = hostViewContainerRef.createComponent(alertCmpFactory);
    cmpRef.instance.message = message;
    this.closeSub = cmpRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

  onSubmit(){
    if(this.loginForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = null;

    let authObs: Observable<AuthResponseData>

    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];

    if(this.formMode){
      authObs = this.authService.signup(email, password);
    }else{
      authObs = this.authService.login(email, password);
    }

    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.isLoading = false;
        this.errorMessage = errorMessage;
        this.showErrorAlert(errorMessage);
    });
    this.loginForm.reset();
  }
}
