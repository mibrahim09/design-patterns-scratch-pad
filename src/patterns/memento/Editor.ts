import { EditorState } from './EditorState';

export class Editor {
  private content: string;

  public getContent() {
    return this.content;
  }

  public setContent(content: string) {
    this.content = content;
  }

  public createState(): EditorState {
    return new EditorState(this.content);
  }

  public restore(state: EditorState) {
    this.setContent(state.getContent());
  }
}
