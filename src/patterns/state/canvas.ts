import { Tool } from './tool';

export class Canvas {
  private tool: Tool;

  public setTool(tool: Tool) {
    this.tool = tool;
  }

  public mouseUp() {
    this.tool.mouseUp();
  }

  public mouseDown() {
    this.tool.mouseDown();
  }
}
