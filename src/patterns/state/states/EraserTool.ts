import { Tool } from '../tool';

export class EraserTool implements Tool {
  mouseDown(): void {
    console.log('eraser tool selected');
  }

  mouseUp(): void {
    console.log('erasing from canvas');
  }
}
