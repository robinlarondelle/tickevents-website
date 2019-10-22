import { Injectable } from '@angular/core';
import { IdentityUser } from '../models/identityUser.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedInIdentityUser: IdentityUser

  constructor(
    private http: HttpClient
  ) { }

  getIdentityUserById(identityUserID: number, token: string): Observable<IdentityUser> {
    return this.http.get<IdentityUser>(`${environment.BASE_URL}/api/users/identity/${identityUserID}/${token}`)
  }
}
