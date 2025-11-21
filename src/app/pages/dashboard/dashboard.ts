import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';
import { Card } from '../../shared/components/card/card';
import { CardHeader } from '../../shared/components/card-header/card-header';
import { CardTitle } from '../../shared/components/card-title/card-title';
import { CardContent } from '../../shared/components/card-content/card-content';
import { CardDescription } from '../../shared/components/card-description/card-description';
import { Button } from '../../shared/components/button/button';

@Component({
    selector: 'app-dashboard',
    imports: [
        Footer,
        RouterLink,
        Card,
        CardHeader,
        CardTitle,
        CardContent,
        CardDescription,
        Button
    ],
    templateUrl: './dashboard.html',
    styleUrl: './dashboard.css',
})
export class Dashboard {
}

