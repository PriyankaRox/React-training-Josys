import React from 'react';

import EmpList from './EmpList';
import EmpOperations from './EmpOperations';

const App: React.FC = () => {
  return (
    <div>
      <h1>Employee Management</h1>
      <EmpOperations />
      <EmpList />
    </div>
  );
};

export default App;
