import { NgModule } from '@angular/core';
import { SemanticDiffDirective } from './semantic-diff.directive';
import { DiffMatchPatch } from './diff-match-patch';
import { DiffMatchPatchService } from './diff-match-patch.service';

@NgModule({
  declarations: [
    SemanticDiffDirective,
  ],
  exports: [
    SemanticDiffDirective,
  ],
  providers: [
    DiffMatchPatch,
    DiffMatchPatchService
  ]
})
export class DiffMatchPatchModule { }

