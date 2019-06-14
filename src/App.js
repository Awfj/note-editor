import React from 'react';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Notes from './containers/Notes/Notes';

library.add(fas);

function App() {
  return (
    <div className="App">
      <h1>Note Editor</h1>
      <Notes />
    </div>
  );
}

export default App;
