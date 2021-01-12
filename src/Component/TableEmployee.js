import React, { useCallback, useEffect, useState } from 'react';
import ModalEmployee from './ModalEmployee';
import CatDog from '../ServiceContentful/CatDog';

const TableEmployee = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [componentEmployee, setComponentEmployee] = useState(null);

  const deleteEmployee = useCallback(
    ({ id }) => () => {
      console.log(id, 'delete');
      CatDog.deleteEmployee(id)
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      CatDog.getAllEmployee
        .then((result) => {
          console.log(result);
          setEmployeeList(result.reverse());
        })
        .catch((error) => {
          setEmployeeList([]);
          console.log(error);
        });
    },
    [setEmployeeList]
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

  useEffect(() => {
    CatDog.getAllEmployee
      .then((result) => {
        setEmployeeList(result);
      })
      .catch((error) => {
        setEmployeeList([]);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    CatDog.getAllEmployee
      .then((result) => {
        setEmployeeList(result);
      })
      .catch((error) => {
        setEmployeeList([]);
        console.log(error);
      });
  }, [employeeList]);

  return (
    <>
      <div className='buttons'>
        <button onClick={createEmployee} className='button is-link'>
          Create Employee
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
        <tbody>
          {employeeList.map((element) => {
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
          })}
        </tbody>
      </table>
      {componentEmployee}
    </>
  );
};

export default TableEmployee;
