import React, { useState } from 'react';

import axios from 'axios';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

interface Employee {
  id?: number;
  name: string;
  position: string;
}

const EmpOperations: React.FC = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<Employee>({
    name: "",
    position: "",
  });

  const addMutation = useMutation(
    (newEmployee: Employee) =>
      axios.post("http://localhost:3001/employees", newEmployee),
    {
      onSuccess: () => queryClient.invalidateQueries(["employees"]),
    }
  );

  const updateMutation = useMutation(
    (updatedEmployee: Employee) =>
      axios.put(
        `http://localhost:3001/employees/${updatedEmployee.id}`,
        updatedEmployee
      ),
    {
      onSuccess: () => queryClient.invalidateQueries(["employees"]),
    }
  );

  const deleteMutation = useMutation(
    (id: number) => axios.delete(`http://localhost:3001/employees/${id}`),
    {
      onSuccess: () => queryClient.invalidateQueries(["employees"]),
    }
  );

  const handleAdd = () => {
    addMutation.mutate(formData);
    setFormData({ name: "", position: "" });
  };

  const handleUpdate = (id: number) => {
    updateMutation.mutate({ ...formData, id });
    setFormData({ name: "", position: "" });
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Position"
        value={formData.position}
        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={() => handleUpdate(1)}>Update (ID: 1)</button>
      <button onClick={() => handleDelete(1)}>Delete (ID: 1)</button>
    </div>
  );
};

export default EmpOperations;
