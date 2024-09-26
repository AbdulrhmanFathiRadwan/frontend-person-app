import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent {
  personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    public dialogRef: MatDialogRef<PersonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public person: Person
  ) {
    this.personForm = this.fb.group({
      id: [person.id],
      name: [person.name || '', Validators.required],
      address: [person.address || '']
    });
  }

  onSubmit(): void {
    if (this.personForm.valid) {
      if (this.person.id) {
        this.personService.updatePerson(this.personForm.value).subscribe(() => {
          this.dialogRef.close();
        });
      } else {
        this.personService.createPerson(this.personForm.value).subscribe(() => {
          this.dialogRef.close();
        });
      }
    }
  }
}
