import { useCallback, useEffect, useState } from 'react';
import ModalEmployee from './ModalEmployee';
import CatDog from '../ServiceContentful/CatDog';
import { getAllEmployee } from '../ServiceContentful/contentful-delivery';

const FetchData = async (setEmployeeList) => {
  console.log('Solicitado');
  const response = await getAllEmployee();
  const rows = response.items.map((currentValue) => {
    const {
      sys: { id },
      fields: { username, code, startDate, dui, position },
    } = currentValue;
    return { id, username, code, startDate, dui, position };
  });
  setEmployeeList(rows);
};

const TrBody = ({ employeeList, updateEmployee, deleteEmployee }) => {
  return employeeList.map((element) => {
    const { id, username, code, startDate, dui, position } = element;
    return (
      <tr key={id}>
        <td>{username}</td>
        <td>{code}</td>
        <td>{new Date(startDate).toLocaleString()}</td>
        <td>{dui}</td>
        <td>{position}</td>
        <td>
          <p className='buttons'>
            <button onClick={updateEmployee(element)} className='button is-small is-info is-outlined'>
              <span className='icon is-small'>
                <i className='fas fa-user-edit' />
              </span>
            </button>
            <button onClick={deleteEmployee(element)} className='button is-small is-danger is-outlined'>
              <span className='icon is-small'>
                <i className='fas fa-user-times' />
              </span>
            </button>
          </p>
        </td>
      </tr>
    );
  });
};

const TableEmployee = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [componentEmployee, setComponentEmployee] = useState(null);

  const updateList = useCallback(() => FetchData(setEmployeeList), []);

  const deleteEmployee = useCallback(
    ({ id }) => () => {
      CatDog.deleteEmployee(id)
        .then((result) => {
          console.log(result);
          FetchData(setEmployeeList);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  const updateEmployee = useCallback(
    (employee) => () => {
      setComponentEmployee(
        <ModalEmployee isUpdate={true} employee={employee} setComponentEmployee={setComponentEmployee} />
      );
    },
    []
  );

  const createEmployee = useCallback(() => {
    setComponentEmployee(
      <ModalEmployee
        isUpdate={false}
        employee={{ id: '', username: '', code: '', startDate: Date.now(), dui: '', position: '' }}
        setComponentEmployee={setComponentEmployee}
      />
    );
  }, []);

  const body = <TrBody updateEmployee={updateEmployee} deleteEmployee={deleteEmployee} employeeList={employeeList} />;
  return (
    <>
      <div className='buttons'>
        <button onClick={createEmployee} className='button is-link'>
          Create Employee
        </button>
        <button onClick={updateList} className='button is-link'>
          Fetch Data
        </button>
      </div>
      <table className='table is-fullwidth is-hoverable'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Code</th>
            <th>Start Date</th>
            <th>DUI</th>
            <th>Position</th>
            <th>Config</th>
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
      {componentEmployee}
    </>
  );
};

export default TableEmployee;
