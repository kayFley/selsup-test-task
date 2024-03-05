import React from 'react';
import ParamEditor from './ParamEditor';
import "./App.css"

interface Param {
  id: number;
  name: string;
  type: 'string';
}

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: 'string',
  },
  {
    id: 2,
    name: "Длина",
    type: 'string',
  }
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    }
  ],
  colors: [],
};

const App = () => {
  // const paramEditorRef = React.useRef(null);
  const paramEditorRef = React.useRef<ParamEditor>(null);

  const handleGetModel = () => {
    if (paramEditorRef.current) {
      const modelData = paramEditorRef.current.getModel();
      console.log(modelData);
    }
  };

  return (
      <div>
        <ParamEditor ref={paramEditorRef} params={params} model={model} />
        <button className='param-editor-button' onClick={handleGetModel}>Получить модель в консоль</button>
      </div>
  );
};

export default App;