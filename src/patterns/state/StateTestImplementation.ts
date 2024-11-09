import { Canvas } from './canvas';
import { EraserTool } from './states/EraserTool';
import { SelectionTool } from './states/SelectionTool';

export class StateTestImplementation {
  public runImpl() {
    const canvas = new Canvas();

    // set a tool to erasor
    canvas.setTool(new EraserTool());
    canvas.mouseUp();
    canvas.mouseDown();

    // chjange the tool
    canvas.setTool(new SelectionTool());
    canvas.mouseUp();
    canvas.mouseDown();
  }
}
