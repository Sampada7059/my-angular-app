import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  message: string = 'Initial message';

  onClick() {
    this.message = 'Button was clicked!';
  }
  // userInput: string = '';
  message2: string = 'Hover over the box';

  formData: string = '';

  onSubmit(event: Event) {
    event.preventDefault();
    this.formData = 'Form submitted!';
  }

  userInput: string = '';
 
}
