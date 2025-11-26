import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ResumeService, Resume } from '../../../services/resume.service';
import { Auth } from '../../../services/auth';
import { ToastService } from '../../../shared/components/toast-container/toast.service';

@Component({
    selector: 'app-resume-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
    templateUrl: './resume-form.html',
    styleUrl: './resume-form.css',
})
export class ResumeForm implements OnInit {
    resumeForm: FormGroup;
    isEditMode = false;
    isSubmitting = false;
    resumeId: string | null = null;
    currentUser: any;
    skillInput = '';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private resumeService: ResumeService,
        private auth: Auth,
        private toast: ToastService
    ) {
        this.currentUser = this.auth.currentUser();
        this.resumeForm = this.createForm();
    }

    ngOnInit() {
        this.resumeId = this.route.snapshot.paramMap.get('id');
        this.isEditMode = !!this.resumeId;

        if (this.isEditMode && this.resumeId) {
            this.loadResume(this.resumeId);
        } else {
            // Pre-fill with user data
            if (this.currentUser) {
                this.resumeForm.patchValue({
                    name: this.currentUser.name || '',
                    email: this.currentUser.email || ''
                });
            }
        }
    }

    createForm(): FormGroup {
        return this.fb.group({
            title: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            linkedin: [''],
            github: [''],
            website: [''],
            summary: ['', Validators.required],
            experience: this.fb.array([]),
            education: this.fb.array([]),
            projects: this.fb.array([]),
            skills: this.fb.array([])
        });
    }

    loadResume(id: string) {
        this.resumeService.getResume(id).subscribe({
            next: (resume) => {
                if (resume) {
                    this.resumeForm.patchValue({
                        title: resume.title,
                        name: resume.name,
                        email: resume.email,
                        phone: resume.phone,
                        linkedin: resume.linkedin,
                        github: resume.github,
                        website: resume.website,
                        summary: resume.summary
                    });

                    // Load experience
                    resume.experience.forEach(exp => {
                        this.experience.push(this.fb.group({
                            company: [exp.company],
                            position: [exp.position],
                            startDate: [exp.startDate],
                            endDate: [exp.endDate],
                            current: [exp.current],
                            description: [exp.description]
                        }));
                    });

                    // Load education
                    resume.education.forEach(edu => {
                        this.education.push(this.fb.group({
                            institution: [edu.institution],
                            degree: [edu.degree],
                            field: [edu.field],
                            startDate: [edu.startDate],
                            endDate: [edu.endDate],
                            current: [edu.current]
                        }));
                    });

                    // Load projects
                    resume.projects.forEach(proj => {
                        this.projects.push(this.fb.group({
                            name: [proj.name],
                            description: [proj.description],
                            technologies: [proj.technologies],
                            startDate: [proj.startDate],
                            endDate: [proj.endDate],
                            current: [proj.current],
                            url: [proj.url || '']
                        }));
                    });

                    // Load skills
                    resume.skills.forEach(skill => {
                        this.skills.push(this.fb.control(skill));
                    });
                }
            },
            error: () => {
                this.toast.error('Failed to load resume');
                this.router.navigate(['/resumes']);
            }
        });
    }

    get experience(): FormArray {
        return this.resumeForm.get('experience') as FormArray;
    }

    get education(): FormArray {
        return this.resumeForm.get('education') as FormArray;
    }

    get projects(): FormArray {
        return this.resumeForm.get('projects') as FormArray;
    }

    get skills(): FormArray {
        return this.resumeForm.get('skills') as FormArray;
    }

    addExperience() {
        this.experience.push(this.fb.group({
            company: [''],
            position: [''],
            startDate: [''],
            endDate: [''],
            current: [false],
            description: ['']
        }));
    }

    removeExperience(index: number) {
        this.experience.removeAt(index);
    }

    addEducation() {
        this.education.push(this.fb.group({
            institution: [''],
            degree: [''],
            field: [''],
            startDate: [''],
            endDate: [''],
            current: [false]
        }));
    }

    removeEducation(index: number) {
        this.education.removeAt(index);
    }

    addProject() {
        this.projects.push(this.fb.group({
            name: [''],
            description: [''],
            technologies: [[]],
            startDate: [''],
            endDate: [''],
            current: [false],
            url: ['']
        }));
    }

    removeProject(index: number) {
        this.projects.removeAt(index);
    }

    getTechnologiesString(projectFormGroup: any): string {
        const technologies = projectFormGroup.get('technologies')?.value;
        return Array.isArray(technologies) ? technologies.join(', ') : '';
    }

    updateTechnologies(projectFormGroup: any, event: Event) {
        const input = (event.target as HTMLInputElement).value;
        const technologies = input.split(',').map(t => t.trim()).filter(t => t);
        projectFormGroup.get('technologies')?.setValue(technologies);
    }

    addSkills() {
        if (!this.skillInput.trim()) return;

        const skillsToAdd = this.skillInput.split(',').map(s => s.trim()).filter(s => s);
        skillsToAdd.forEach(skill => {
            if (!this.skills.value.includes(skill)) {
                this.skills.push(this.fb.control(skill));
            }
        });
        this.skillInput = '';
    }

    removeSkill(index: number) {
        this.skills.removeAt(index);
    }

    onSubmit() {
        if (!this.resumeForm.valid || !this.currentUser) return;

        this.isSubmitting = true;
        const formValue = this.resumeForm.value;

        const resumeData = {
            ...formValue,
            userId: this.currentUser.email,
            isDefault: false
        };

        const operation = this.isEditMode && this.resumeId
            ? this.resumeService.updateResume(this.resumeId, resumeData)
            : this.resumeService.createResume(resumeData);

        operation.subscribe({
            next: () => {
                this.toast.success(this.isEditMode ? 'Resume updated successfully' : 'Resume created successfully');
                this.router.navigate(['/resumes']);
            },
            error: () => {
                this.toast.error(this.isEditMode ? 'Failed to update resume' : 'Failed to create resume');
                this.isSubmitting = false;
            }
        });
    }
}
