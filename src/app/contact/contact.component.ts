import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <div class="container">
      <section id="contact">
        <h2 class='section-title'>Contact us</h2>
        <p>Office Address: Lorem Ipsum Dolor Street</p>
        <p>Phone numbers: 090000000</p>
        <ul>
            <li><a href="https://www.facebook.com/">Facebook</a></li>
            <li><a href="https://x.com/">X</a></li>
            <li><a href="https://www.instagram.com/">Instagram</a></li>
        </ul>
      </section>
    </div>
  `,
  styles: `
  
  `
})
export class ContactComponent {

}
