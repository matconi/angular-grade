import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  helloText = '';

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  logout() {
    this.oauthService.logOut();
  }

  getHelloText() {
    console.log("vem bosta: " + this.oauthService.getAccessToken())
    this.httpClient.get<{ message: string }>('http://localhost:7000/module/lessons', {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      }
    }).subscribe((result: any) => {
      this.helloText = "Deu bom";
      console.log("vem mais bosta: " + this.helloText)
    });
  }
}
