import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  template: `
    <div class="container">
      <section id="contact">
        <h2 class='section-title'>Contact us</h2>
        <p>Office Address: N1 Circular Road Off Shehu Bukar Street, Old GRA Maiduguri</p>
        <p>Phone numbers: 08165500018, 08030640193</p>
        <ul>
            <li><a href="https://www.facebook.com/swiftrelieffoundation">Facebook</a></li>
            <li><a href="https://x.com/swift_relief_f">X</a></li>
            <li><a href="https://www.instagram.com/swift_relief_foundation_/?hl=en">Instagram</a></li>
        </ul>
      </section>
    </div>
  `,
  styles: `
  
  `
})
export class ContactComponent {

}
