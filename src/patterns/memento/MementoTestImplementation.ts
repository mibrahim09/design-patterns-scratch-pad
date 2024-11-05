import { Editor } from './Editor';
import { EditorHistory } from './History';

export class MementoTestImplementation {
  public runImpl() {
    const editor = new Editor();
    const history = new EditorHistory();
    editor.setContent('Hello');
    history.push(editor.createState());

    editor.setContent('I am');
    history.push(editor.createState());
    editor.setContent('Muhammad');
    history.push(editor.createState());
    console.log('editor.value=', editor.getContent());

    editor.restore(history.pop());
    console.log('editor.value=', editor.getContent());
  }
}
