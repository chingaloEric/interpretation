import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterpretationService} from '../../services/interpretation.service';
import { User } from '../../../../models/users.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() interpretation: any;
  @Input() rootUrl: string;
  @Input() users : any[];
  commentFormData: any;
  @Output() onCommentCreate: EventEmitter<any> = new EventEmitter<any>();
  creating: boolean;

  constructor(private interpretationService: InterpretationService) {
    this.creating = false;
  }
  
  ngOnInit() {
    if (this.interpretation) {
      this.commentFormData = {
        id: this.interpretation.id,
        type: this.interpretation.type,
        comment: ''
      }
    }
  }
  
  postComment(e) {
    e.stopPropagation();
    this.creating = true;
    this.interpretationService.postComment(this.commentFormData, this.rootUrl)
      .subscribe((interpretation: any[]) => {
        this.creating = false;
        this.commentFormData.comment = '';
        this.onCommentCreate.emit(interpretation);
      }, error => {
        this.creating = false;
        console.log(error);
      })
  }

  cancel(e) {
    e.stopPropagation();
    this.commentFormData.comment = '';
  }


  //method to mention
  onCommenting(){
    if(this.commentFormData.comment.charAt(this.commentFormData.comment.length - 1) === '@'){
        
    }
  }

}
