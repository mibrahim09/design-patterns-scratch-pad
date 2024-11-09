import { Tool } from '../tool';

export class SelectionTool implements Tool {
  mouseDown(): void {
    console.log('selection tool selected');
  }

  mouseUp(): void {
    console.log('draw box');
  }
}
