import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';
import { UsersService } from 'src/app/services/users.service';
import { ConfirmedValidator } from './confirmed.validator';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  signupForm: FormGroup;
  hide: boolean = true;
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private _coreService: CoreService
  ) {
    this.signupForm = this._fb.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
          ),
        ]),
        passwordConfirmation: new FormControl(),
      },
      {
        validator: ConfirmedValidator('password', 'passwordConfirmation'),
      }
    );
  }

  onLogin() {
    this.loading = true;
    if (!this.signupForm.valid) {
      return;
    }

    const body = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };

    this._userService.createUser(body).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this._coreService.openSnackBar('User successfully created');
      },
      error: console.error,
    });
  }

  ngOnInit(): void {}
}
