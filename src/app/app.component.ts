import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { authCodeFlowConfig, initializeOAuth } from './app.config';
import { CognitoIdentityProvider, CognitoIdentityProviderClient, ListUserPoolClientsCommand, UserPoolClientDescriptionFilterSensitiveLog } from '@aws-sdk/client-cognito-identity-provider';
import { AwsCredentialIdentity } from "@smithy/types";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  helloText = 'sggh';

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) {
  }

  login() {
    initializeOAuth(this.oauthService);
  }

  logout() {
    this.oauthService.logOut();
  }

  reset() {
    this.helloText = 'sggh';
  }

  getPublicText() {
    this.httpClient.get<{ message: string }>('http://localhost:8080/hello', {
      headers: this.oauthService.getAccessToken() != null ? {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      } : {}
    }).subscribe((result: any) => {
      this.helloText = "Vem";
    }, (error) => {
      this.helloText = `Vem bosta: ${error.message}`;
    });
  }

  getAuthenticatedText() {
    console.log(this.oauthService.getAccessToken());
    this.httpClient.get<{ message: string }>('http://localhost:8080/hello/authenticated', {
      headers: this.oauthService.getAccessToken() != null ? {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      } : {}
    }).subscribe((result: any) => {
      this.helloText = "Vem";
    }, (error) => {
      this.helloText = `Vem bosta: ${error.message}`;
    });
  }
  getAuthorizedText() {
    this.httpClient.get<{ message: string }>('http://localhost:8080/hello/authorized', {
      headers: this.oauthService.getAccessToken() != null ? {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      } : {}
    }).subscribe((result: any) => {
      this.helloText = "Vem mais bom";
    }, (error) => {
      this.helloText = `Vem mais bosta: ${error.message}`;
    });
  }
}
