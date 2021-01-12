import { createContext, useState, useEffect } from 'react';
import CatDog from '../ServiceContentful/CatDog';

export const EmployeeContext = createContext();

const EmployeeContextProvider = (props) => {
  const [employee, setListEmployee] = useState([]);

  useEffect(() => {
    CatDog.then((data) => setListEmployee(data));
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        employee,
      }}
    >
      {props.children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContextProvider;
