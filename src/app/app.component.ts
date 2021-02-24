import { Component,ViewChild,ElementRef, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnChanges,AfterViewInit{
  title = 'rightclick-app';
  text="appointment";
  class="app"

  @ViewChild(MatMenuTrigger, {static: false}) contextMenu: MatMenuTrigger;
  @ViewChild("textDiv", {static: false}) divView: ElementRef;

  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit(){
    
  
  }
 
ngOnChanges(){
  
}
ngAfterViewInit(){
  let domHtml=this.divView.nativeElement.innerHTML;
    
  let index = domHtml.match(this.text).index;
  let endex = index + this.text.length-1;
  console.log(index);
  console.log(endex);

  if(!this.text) {
    this.divView.nativeElement.innerHTML=domHtml;
}else{
  this.divView.nativeElement.innerHTML = domHtml.replace(new RegExp(this.text, "gi"), match => {
    console.log('query: ' + this.text);
    return '<span class="highlightText">' + match + '</span>';
});

}
}

  onContextMenu(event: MouseEvent) {
    let selectedText = ''; 
    let selection=window.getSelection();
    
    if (window.getSelection) { 
        selectedText = selection.toString(); 
        if(selectedText && selectedText.length>0){
          let start = selection.anchorOffset;
          let end = start + selectedText.length-1;//selection.focusOffset;
          console.log(selectedText)
          console.log(start)
          console.log(end)

         /* console.log(this.divView.nativeElement.innerHTML);
          let domHtml=this.divView.nativeElement.innerHTML;
          var index = -1;
          var endex = -1;
          if (domHtml) {
              index = domHtml.indexOf(selectedText);
              endex = index + selectedText.length;
          }
          console.log(index)
          console.log(endex)*/
          event.preventDefault();
          this.contextMenuPosition.x = event.clientX + 'px';
          this.contextMenuPosition.y = event.clientY + 'px';
          this.contextMenu.menu.focusFirstItem('mouse');
          this.contextMenu.openMenu();
        }
       
    } 
   
  }

  onContextMenuAction1() {
    console.log(`Click on Action 1 for`);
  }

  onContextMenuAction2() {
    console.log(`Click on Action 2 for`);
  }
  
}


