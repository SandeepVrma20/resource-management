import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule, Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['']);
    
  }

}
