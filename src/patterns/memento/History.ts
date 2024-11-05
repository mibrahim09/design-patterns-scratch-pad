import {EditorState} from "./EditorState";

export class EditorHistory {
    public history = [];

    push(editor: EditorState) {
        this.history.push(editor);
    }

    pop() {
        return this.history.pop();
    }
}