import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <img
        src="https://loading.io/assets/mod/spinner/spin/lg.gif"
        alt="load"
        className="h-auto max-w-full rounded-lg  "
      />
    </div>
  );
};

export default Loader;
