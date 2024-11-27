import React, { useState } from 'react';

import LifecycleDemo from './LifecycleDemo';

const App = () => {
  const [showComponent, setShowComponent] = useState(true);

  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        Toggle LifecycleDemo Component
      </button>
      {showComponent && <LifecycleDemo />}
    </div>
  );
};

export default App;
