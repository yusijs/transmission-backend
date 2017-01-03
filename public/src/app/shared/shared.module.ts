import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { SharedService } from './shared.service';
import { BytesPipe } from './bytes.pipe';
import { PrettyUrlPipe } from './pretty-url.pipe';
import { LoadingComponent } from './loading/loading.component';
import { DataratePipe } from './datarate.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [BytesPipe, PrettyUrlPipe, LoadingComponent, DataratePipe],
  declarations: [SharedComponent, BytesPipe, PrettyUrlPipe, LoadingComponent, DataratePipe],
  providers: [SharedService]
})
export class SharedModule { }
