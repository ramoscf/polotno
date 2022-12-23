import './App.css';
//import { createDemoApp } from 'polotno/polotno-app';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import { createStore } from 'polotno/model/store';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import { setTranslations } from 'polotno/config';
import { getTranslations } from 'polotno/config';

setTranslations({
  sidePanel: {
    templates: 'Formatos',
    text: 'Texto',
    photos: 'Fotos',
    elements: 'Formas',
    upload: 'Enviar',
    background: 'Fundo',
    layers: 'Camadas',
    resize: 'Redimensionar',
  },
});

const store = createStore();
/* Exemplo de criação DEMO
const { store } = createDemoApp({
  container: document.getElementById('root'),
  key: 'PzZO8dQDYqDLAtXmjS2j', // you can create it here: https://polotno.com/cabinet/
  // you can hide back-link on a paid license
  // but it will be good if you can keep it for Polotno project support
  showCredit: true,
});
*/

const page = store.addPage();

page.set({
  // background can be any CSS color string or a url to the image
  background: '#dde3eb',
  // you can use "custom" attribute to save your own custom data
  custom: { myInternalId: 'some-id-here' },
  bleed: 10, // in pixels
  width: 1000, // in pixels. You can use 'auto' to inherit width from the store
  height: 1000, // in pixels. You can use 'auto' to inherit height from the store
});

page.addElement({
  x: 50,
  y: 50,
  type: 'text',
  fill: 'black',
  text: 'Apenas testando algumas palavras',
});
console.log(getTranslations());

const App = () => {
  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} downloadButtonEnabled />
        <Workspace store={store} />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
}

export default App
