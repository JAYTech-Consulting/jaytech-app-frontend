import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCardSection } from './image-card-section';

describe('ImageCardSection', () => {
  let component: ImageCardSection;
  let fixture: ComponentFixture<ImageCardSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCardSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCardSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
