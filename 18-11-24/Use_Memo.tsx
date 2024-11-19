//useMemo Hook is used to memoize the value and used for complex queries and recomputational tasks, it prevents from being recomputation on every render if dependencies remain unchanged
// When to Use useMemo?
// – Data Formatting
// – Filtering Data
// – Sorting Data
// – Memoizing Callback Functions
// – Expensive Calculations

import React, { useMemo } from "react";

interface Item {
  id: number;
  name: string;
}

interface UseMemoProps {
  items: Item[];
}

const Use_Memo: React.FC<UseMemoProps> = ({ items }) => {
  const myItems = useMemo(() => newItems(items), [items]);
  return (
    <div>
      <h1>Use Memo Demo</h1>
      <ul>
        {myItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

const newItems = (items: Item[]): Item[] => {
  return items.map((item) => ({ id: item.id, name: item.name.toUpperCase() }));
};

export default Use_Memo;
