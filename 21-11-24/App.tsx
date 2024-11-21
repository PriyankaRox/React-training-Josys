import './App.css';

import React, {
  Component,
  useEffect,
  useState,
} from 'react';

import {
  FaAppStore,
  FaBook,
  FaDatabase,
  FaReact,
} from 'react-icons/fa';
import {
  Menu,
  MenuItem,
  Sidebar,
  SubMenu,
} from 'react-pro-sidebar';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from 'react-router-dom';

import Customer from './18-11-24/Customer';
import Use_Memo from './18-11-24/Use_Memo';
import UseLayoutEffect from './18-11-24/UseLayoutEffect';
import Childs from './19-11-2024/Childs';
import {
  contextObjs,
  UserInfo,
} from './19-11-2024/context';
import DemoHoc from './19-11-2024/DemoHoc';
import DemoHocGrid from './19-11-2024/DemoHocGrid';
import StorageDemo from './19-11-2024/StorageDemo';
import UseStorage from './19-11-2024/useStorage';
import AuthProviderFunction from './20-11-24/Assignment/AuthProviderFunction';
import BankApp from './20-11-24/Assignment/BankApp';
import ReactQuery from './20-11-24/Assignment/ReactQuery';
import UserProfileFunction from './20-11-24/Assignment/UserProfileFunction';
import DeptsCrud from './20-11-24/Services/DeptsCrud';
import TodoApp from './20-11-24/TodoApp';
import Login from './21-11-24/Authentication/Login';
import Register from './21-11-24/Authentication/Register';
import CustomerCRUD from './21-11-24/CustomerCRUD';
import Employee from './employee_data/Employee';
import UserList from './HOC/UserList';
import Todo from './todo_15-11-2024/Todo';
import Users from './user_details/Users';

// Create a QueryClient instance
const queryClient = new QueryClient();

const AppQuery: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQuery />
    </QueryClientProvider>
  );
};

export interface User {
  id: number;
  name: string;
  email: string;
}

//1. Context Creation for functional
export const contextObj = React.createContext<User | null>(null);

class MyContextApi extends Component {
  userObj: UserInfo = {
    id: 1,
    name: "Max Tow",
    email: "max@gmail.com",
  };
  render() {
    return (
      <div style={{ margin: "10px", border: "2px solid red" }}>
        <h2>Context API Demo</h2>
        <h3>This is App Class Component</h3>
        <hr />
        {/* Context provider */}
        <contextObjs.Provider value={this.userObj}>
          <Childs />
        </contextObjs.Provider>
      </div>
    );
  }
}

interface UserHoc {
  id: number;
  name: string;
  email: string;
  address: string;
  company: string;
}

const HocData = DemoHoc<UserHoc>(DemoHocGrid);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem("user", "loggedIn");
  };

  const handleRegisterSuccess = () => {
    setIsRegistering(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user"); // Clear login status from localStorage
  };

  const items = [
    { id: 1, name: "apple" },
    { id: 2, name: "banana" },
    { id: 3, name: "cherry" },
  ];

  // const [userObj, setUserObj] = useState<User>({
  //   id: 1,
  //   name: "Scott",
  //   email: "scott@gmail.com",
  // });

  //localstorage
  const { add, remove, get } = UseStorage<string>("userName");

  useEffect(() => {
    // Set a value to localStorage when the component mounts
    add("MAX");
  }, [add]);

  const handleRemove = () => {
    remove();
  };

  return (
    <AuthProviderFunction>
      <Router>
        <div className="App">
          <div>
            {isLoggedIn ? (
              // Show main app content after login
              <div>
                <header className="App-header">
                  <div className="title">React App Demo</div>
                  <button className="logout" onClick={handleLogout}>
                    Logout
                  </button>
                </header>

                <div className="main">
                  <Sidebar>
                    <Menu className="sidebar">
                      {/* sub menu */}
                      <SubMenu label="React Concepts" icon={<FaReact />}>
                        <MenuItem>
                          <Link to="/useMemo">Use Memo</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/useContext">Context API</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/callBack">UseLayoutEffect</Link>
                        </MenuItem>
                      </SubMenu>

                      <SubMenu label="Advanced Demos" icon={<FaBook />}>
                        <MenuItem>
                          <Link to="/hoc">HOC</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/gridHoc">Grid HOC Demo</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/storage">Local Storage</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/query">React Query</Link>
                        </MenuItem>
                      </SubMenu>
                      <SubMenu label="Data Management" icon={<FaDatabase />}>
                        <MenuItem>
                          <Link to="/customer">Customer</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/employee">Employee</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/customer-data">Customer CRUD</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/user">User</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/db">JSON Demo</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/crud">JSON CRUD Demo</Link>
                        </MenuItem>
                      </SubMenu>

                      <SubMenu label="Applications" icon={<FaAppStore />}>
                        <MenuItem>
                          <Link to="/todo"> Todo</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/bank">Banking App</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/todoApp">Simple Todo</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link to="/auth">Authentication</Link>
                        </MenuItem>
                      </SubMenu>
                    </Menu>
                  </Sidebar>

                  <div className="content">
                    <Routes>
                      <Route path="/employee" element={<Employee />} />
                      <Route path="/user" element={<Users />} />
                      <Route path="/todo" element={<Todo />} />
                      <Route
                        path="/useMemo"
                        element={<Use_Memo items={items} />}
                      />
                      <Route path="/customer" element={<Customer />} />
                      <Route path="/callBack" element={<UseLayoutEffect />} />
                      <Route
                        path="/hoc"
                        element={
                          <UserList url="https://jsonplaceholder.typicode.com/users" />
                        }
                      />
                      <Route path="/useContext" element={<MyContextApi />} />
                      <Route path="/todoApp" element={<TodoApp />} />
                      <Route
                        path="/gridHoc"
                        element={
                          <HocData
                            url="https://jsonplaceholder.typicode.com/users"
                            dataProperties={["id", "name", "email"]}
                          />
                        }
                      />

                      {/* useReducer function */}
                      <Route path="/auth" element={<UserProfileFunction />} />

                      <Route path="/bank" element={<BankApp />} />

                      <Route path="/query" element={<AppQuery />} />

                      {/* <Route path="/db" element={<Demo />} /> */}

                      <Route path="/crud" element={<DeptsCrud />} />

                      <Route path="/customer-data" element={<CustomerCRUD />} />

                      <Route path="/storage" element={<StorageDemo />} />

                      {/* functional Component context example */}
                      {/* <Route
              path="/useContext"
              element={
                <contextObj.Provider value={userObj}>
                  <Child />
                </contextObj.Provider>
              }
            /> */}
                    </Routes>
                    {/* <div>
            <h1>localStorage Example</h1>
            <p>Stored value: {get()}</p>
            <button onClick={handleRemove}>Remove from Local Storage</button>
          </div> */}
                  </div>
                  {/* <div style={{ margin: "10px", border: "2px solid red" }}>
        <h3>This is App Component</h3>
        <hr /> */}
                  {/* 2. Context Provider  */}
                  {/* <contexObj.Provider value={userObj}>
          <Child />
        </contexObj.Provider> */}
                  {/* </div> */}
                </div>
              </div>
            ) : (
              <div>
                {!isRegistering ? (
                  <div className="auth-container">
                    <div className="auth-card">
                      <Login onLoginSuccess={handleLoginSuccess} />
                      <p className="auth-footer">
                        Create User?
                        <button
                          className="register-btn"
                          onClick={() => setIsRegistering(true)}
                        >
                          Register
                        </button>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="auth-container">
                    <div className="auth-card">
                      <Register onRegisterSuccess={handleRegisterSuccess} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Router>
    </AuthProviderFunction>
  );
};

export default App;
