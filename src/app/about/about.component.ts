import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  template:  `
    <div>
        <section id="about-section">
            <h2 className='section-title'>About the Project</h2>
            <p>This is a data collection project for the 2024 Maiduguri flood victims. The project is sponsored by Swift Relief Foundation.</p>
        </section>
    </div>
  `,
  styles:  `
    #contact, #about-section {
      text-align: left;
    }
  `
})
export class AboutComponent {

}
