import { Directive, ElementRef, Input } from '@angular/core';
import { DiffMatchPatchService } from './diff-match-patch.service';

@Directive({
  selector: '[semanticDiff]'
})
export class SemanticDiffDirective {
  @Input() left: string;
  @Input() right: string;

  constructor(private el: ElementRef, private dmp: DiffMatchPatchService) {  }

  ngOnInit () {
    this.el.nativeElement.innerHTML = this.createHtml(this.dmp.getSemanticDiff(this.left, this.right));
  }

  createHtml (diffs) {
    var html: string;
    html = "<div>"
    for(let diff of diffs) {
      diff[1] = diff[1].replace(/\n/g, '<br/>');

      if(diff[0] == 0) {
        html += diff[1];
      }
      if(diff[0] == -1) {
        html += "<del>" + diff[1] + "</del>";
      }
      if(diff[0] == 1) {
        html += "<ins>" + diff[1] + "</ins>";
      }
    }
    html += "</div>"
    return html;
  }

}
