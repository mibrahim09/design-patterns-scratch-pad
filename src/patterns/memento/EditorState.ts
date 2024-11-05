export class EditorState {
  constructor(private readonly content: string) {}

  public getContent() {
    return this.content;
  }
}
