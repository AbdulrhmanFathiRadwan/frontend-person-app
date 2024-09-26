import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';
import { MatDialog } from '@angular/material/dialog';
import { PersonFormComponent } from '../person-form/person-form.component';


@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit{
  persons: Person[] = [];

  constructor(private personService: PersonService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPersons();
  }

  loadPersons(): void {
    this.personService.getPersons().subscribe(persons => {
      this.persons = persons;
    });
  }

  addPerson(): void {
    const dialogRef = this.dialog.open(PersonFormComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadPersons();
    });
  }

  editPerson(person: Person): void {
    const dialogRef = this.dialog.open(PersonFormComponent, {
      width: '400px',
      data: person
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadPersons();
    });
  }

  deletePerson(id: number): void {
    this.personService.deletePerson(id).subscribe(() => {
      this.loadPersons();
    });
  }
}
