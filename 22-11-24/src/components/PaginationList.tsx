import './page.css';

import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

interface Employee {
  id: number;
  name: string;
  role: string;
}

const PaginatedList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const ITEMS_PER_PAGE = 6; // Number of items per page

  const fetchEmployees = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/employees?_page=${page}&_limit=${ITEMS_PER_PAGE}`
      );
      const totalCount = parseInt(response.headers["x-total-count"], 10);
      setTotalPages(Math.ceil(totalCount / ITEMS_PER_PAGE));
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container">
      <h3>Employee List</h3>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="card-container">
          {employees.map((employee) => (
            <div key={employee.id} className="card">
              <h4>{employee.name}</h4>
              <p>{employee.role}</p>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-button"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedList;
