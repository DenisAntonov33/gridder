import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {EditPostComponent} from './edit-post.component';
import {PostModel} from '../../../../services/models/post/post.model';
import {PostCreationPayload} from '../../../../services/models/post/post.types';
import {By} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPostComponent],
      imports: [ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty controls', () => {
    const postEditForm = component.postEditForm;
    expect(postEditForm).toBeDefined();
    expect(postEditForm.controls['title'].value).toBe('');
    expect(postEditForm.controls['text'].value).toBe('');
  });

  it('should update the form when input post is set', () => {
    const post: PostModel = {title: 'Test Title', text: 'Test Text'} as unknown as PostModel;
    component.post = post;
    fixture.detectChanges();

    expect(component.postEditForm.controls['title'].value).toBe(post.title);
    expect(component.postEditForm.controls['text'].value).toBe(post.text);
  });

  it('should emit postSave event when form is valid and submitted', () => {
    spyOn(component.postSave, 'emit');

    component.postEditForm.setValue({title: 'Test Title', text: 'Test Text'});
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);

    const expectedPayload: PostCreationPayload = {
      title: 'Test Title',
      text: 'Test Text',
    };

    expect(component.postSave.emit).toHaveBeenCalledOnceWith(expectedPayload);
  });

  it('should not emit postSave event when form is invalid', () => {
    spyOn(component.postSave, 'emit');

    component.postEditForm.setValue({title: '', text: ''});
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);

    expect(component.postSave.emit).not.toHaveBeenCalled();
  });

  it('should disable submit button if form is invalid', () => {
    const button: DebugElement = fixture.debugElement.query(By.css('button'));

    component.postEditForm.controls['title'].setValue('');
    component.postEditForm.controls['text'].setValue('');
    fixture.detectChanges();

    expect(button.nativeElement.disabled).toBeTruthy();

    component.postEditForm.controls['title'].setValue('Valid Title');
    component.postEditForm.controls['text'].setValue('Valid Text');
    fixture.detectChanges();

    expect(button.nativeElement.disabled).toBeFalsy();
  });

  it('should show validation error messages for required fields', () => {
    const titleField: DebugElement = fixture.debugElement.query(By.css('input[name="title"]'));
    const textField: DebugElement = fixture.debugElement.query(By.css('textarea[name="text"]'));

    component.postEditForm.controls['title'].setValue('');
    component.postEditForm.controls['text'].setValue('');
    fixture.detectChanges();

    const titleError = titleField.parent!.query(By.css('mat-error'));
    const textError = textField.parent!.query(By.css('mat-error'));

    expect(titleError!.nativeElement.textContent.trim()).toBe('Title is required');
    expect(textError!.nativeElement.textContent.trim()).toBe('Text is required');
  });
});
