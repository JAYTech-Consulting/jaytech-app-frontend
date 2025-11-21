// src/app/app-routing.ts
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Profile } from './pages/profile/profile';
import { Service } from './pages/service/service';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { TalentProfile } from './pages/talent-profile/talent-profile';
import { TalentJobBoard } from './pages/job-posts/talent-job-board/talent-job-board';
import { MyApplications } from './pages/job-posts/my-applications/my-applications';
import { JobPostList } from './pages/job-posts/job-post-list/job-post-list';
import { JobPostForm } from './pages/job-posts/job-post-form/job-post-form';
import { JobApplicants } from './pages/job-posts/job-applicants/job-applicants';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { AdminLogin } from './pages/admin/admin-login/admin-login';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminJobApproval } from './pages/admin/admin-job-approval/admin-job-approval';
import { AdminApplicationApproval } from './pages/admin/admin-application-approval/admin-application-approval';
import { AdminOverview } from './pages/admin/admin-overview/admin-overview';
import { RecruiterJobs } from './pages/admin/recruiter-jobs/recruiter-jobs';
import { RecruiterJobApplicants } from './pages/admin/recruiter-job-applicants/recruiter-job-applicants';
import { ResumeList } from './pages/resumes/resume-list/resume-list';
import { ResumeForm } from './pages/resumes/resume-form/resume-form';
import { ResumePreview } from './pages/resumes/resume-preview/resume-preview';

export const appRoutes: Routes = [
    { path: '', component: Home },
    { path: 'about-us', component: About },
    { path: 'services', component: Service },
    { path: 'contact-us', component: Contact },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'profile', component: Profile },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
    { path: 'talent-profile', component: TalentProfile, canActivate: [authGuard] },
    { path: 'jobs', component: TalentJobBoard, canActivate: [authGuard] },
    { path: 'my-applications', component: MyApplications, canActivate: [authGuard] },
    { path: 'resumes', component: ResumeList, canActivate: [authGuard] },
    { path: 'resumes/new', component: ResumeForm, canActivate: [authGuard] },
    { path: 'resumes/:id/edit', component: ResumeForm, canActivate: [authGuard] },
    { path: 'resumes/:id/preview', component: ResumePreview, canActivate: [authGuard] },
    { path: 'recruiter/jobs', component: JobPostList, canActivate: [authGuard] },
    { path: 'recruiter/jobs/new', component: JobPostForm, canActivate: [authGuard] },
    { path: 'recruiter/jobs/:id', component: JobPostForm, canActivate: [authGuard] },
    { path: 'recruiter/jobs/:id/applicants', component: JobApplicants, canActivate: [authGuard] },
    { path: 'admin/login', component: AdminLogin },
    { path: 'admin/dashboard', component: AdminDashboard, canActivate: [adminGuard] },
    { path: 'admin/overview', component: AdminOverview, canActivate: [adminGuard] },
    { path: 'admin/recruiter/:email', component: RecruiterJobs, canActivate: [adminGuard] },
    { path: 'admin/recruiter/:email/job/:jobId', component: RecruiterJobApplicants, canActivate: [adminGuard] },
    { path: 'admin/jobs', component: AdminJobApproval, canActivate: [adminGuard] },
    { path: 'admin/applications', component: AdminApplicationApproval, canActivate: [adminGuard] },
];
