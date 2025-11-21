import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ResumeService, Resume } from '../../../services/resume.service';
import { ToastService } from '../../../shared/components/toast-container/toast.service';

interface ColorTheme {
    name: string;
    primary: string;
    secondary: string;
}

@Component({
    selector: 'app-resume-preview',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './resume-preview.html',
    styleUrl: './resume-preview.css',
})
export class ResumePreview implements OnInit {
    resume: Resume | undefined;
    isLoading = true;
    selectedTemplate = 'modern';
    selectedColor = 'indigo';

    colorThemes: ColorTheme[] = [
        { name: 'Indigo', primary: '#4f46e5', secondary: '#6366f1' },
        { name: 'Blue', primary: '#2563eb', secondary: '#3b82f6' },
        { name: 'Emerald', primary: '#059669', secondary: '#10b981' },
        { name: 'Purple', primary: '#7c3aed', secondary: '#8b5cf6' },
        { name: 'Rose', primary: '#e11d48', secondary: '#f43f5e' },
        { name: 'Amber', primary: '#d97706', secondary: '#f59e0b' },
        { name: 'Teal', primary: '#0d9488', secondary: '#14b8a6' },
        { name: 'Slate', primary: '#475569', secondary: '#64748b' }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private resumeService: ResumeService,
        private toast: ToastService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadResume(id);
        } else {
            this.router.navigate(['/resumes']);
        }
    }

    loadResume(id: string) {
        this.isLoading = true;
        this.resumeService.getResume(id).subscribe({
            next: (resume) => {
                if (resume) {
                    this.resume = resume;
                } else {
                    this.toast.error('Resume not found');
                    this.router.navigate(['/resumes']);
                }
                this.isLoading = false;
            },
            error: () => {
                this.toast.error('Failed to load resume');
                this.router.navigate(['/resumes']);
                this.isLoading = false;
            }
        });
    }

    formatDate(dateString: string): string {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    getThemeColor(type: 'primary' | 'secondary'): string {
        const theme = this.colorThemes.find(t => t.name.toLowerCase() === this.selectedColor);
        return theme ? theme[type] : this.colorThemes[0][type];
    }

    print() {
        window.print();
    }
}
