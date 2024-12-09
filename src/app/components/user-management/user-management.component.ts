import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

export interface User {
  id: number;
  username: string;
  role: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  roles: string[] = ['admin', 'editor', 'viewer'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  updateUserRole(userId: number, role: string): void {
    this.userService.updateUserRole(userId, role).subscribe(updatedUser => {
      alert(`${updatedUser.username}'s role has been updated`);
    });
  }
}
