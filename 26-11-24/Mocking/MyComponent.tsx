import React, { useState } from 'react';

import axios from 'axios';

function MyComponent() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/data");
      setData(response.data.message);
    } catch (error) {
      setData("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {loading && <p>Loading...</p>}
      {data && <p>{data}</p>}
    </div>
  );
}

export default MyComponent;
