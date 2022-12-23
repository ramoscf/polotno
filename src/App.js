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
import { observer } from 'mobx-react-lite';
import { GiPostStamp } from 'react-icons/gi';


import {
  TextSection,
  PhotosSection,
  ElementsSection,
  UploadSection,
  BackgroundSection,
  SizeSection,
} from 'polotno/side-panel';
//
import { SectionTab } from 'polotno/side-panel';

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
    searchPlaceholder: 'Procurar',
  },
  toolbar: {
    position: "Posição",
  }
});

const store = createStore();

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

// define the new custom section
const CustomSection = {
  name: 'selos',
  Tab: (props) => (
    <SectionTab name="Selos" {...props}>
      <i><GiPostStamp /></i>
    </SectionTab>
  ),
  // we need observer to update component automatically on any store changes
  Panel: observer(({ store }) => {
    return (
      <div>
        <p draggable>Área pra carregar os selos</p>
        <p draggable>Selos: {store.activePage?.children.length}</p>
      </div>
    );
  }),
};

const sections = [TextSection, PhotosSection, ElementsSection, CustomSection, UploadSection, BackgroundSection, SizeSection];

const App = () => {
  return (
    <PolotnoContainer style={{ width: '100vw', height: '100vh' }}>
      <SidePanelWrap>
        <SidePanel store={store} sections={sections} defaultSection="custom" />
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
