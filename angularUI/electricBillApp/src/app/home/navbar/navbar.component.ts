import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  companytInf: String[] = ["about_cspdl", "board_of_directors", "company_mission"]
  consumerService: String[] = ["applicant-Register", "Applicant_Login", "Applicant_status", "download_form "];
  renewbleenrgy: String[] = ["Green Energy","Materials & Works"," Power Evacation Capacity","Solar Rooftop Netmetering","Telangana Solar Bid 2015",
    "Telangana State Solar Power Policy","Telangana Solar Bid 2014"];
    tenders:string[]=["P&MM Tender Notices","P&MM Tender Specifications","General Tenders","Nomination's","Contractors","Black Listed Firms"];
}
