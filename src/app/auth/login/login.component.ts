import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validator,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean = true;
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private _coreService: CoreService
  ) {
    this.loginForm = this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    if (this.loginService.loggedUser) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    this.loading = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.loginService.login(this.loginForm.value).subscribe({
      next: (usu) => {
        if (usu) {
          this.loginService.loggedUser = usu;
        }
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this._coreService.openSnackBar(err.error.message);
      },
    });
  }

  ngOnInit(): void {}
}
