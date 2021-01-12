import { useCallback, useEffect, useState } from 'react';
import ModalEmployee from './ModalEmployee';
import { deleteEmployee as deleteUser } from '../ServiceContentful/contentful-management';
import { getAllEmployee } from '../ServiceContentful/contentful-delivery';

const FetchData = async (setEmployeeList) => {
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
  const [notification, setNotification] = useState({ show: false, message: '', isSuccess: true });
  const [loading, setLoading] = useState(false);

  const deleteEmployee = useCallback(
    ({ id }) => () => {
      setLoading(true);
      deleteUser(id)
        .then((result) => {
          console.log(result);
          FetchData(setEmployeeList);
          setNotification({ show: true, message: result, isSuccess: true });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setNotification({ show: true, message: error, isSuccess: false });
          setLoading(false);
        });
    },
    []
  );

  const updateEmployee = useCallback(
    (employee) => () => {
      setNotification({ show: false });
      setComponentEmployee(
        <ModalEmployee isUpdate={true} employee={employee} setComponentEmployee={setComponentEmployee} />
      );
    },
    []
  );

  const createEmployee = useCallback(() => {
    setNotification({ show: false });
    setComponentEmployee(
      <ModalEmployee
        isUpdate={false}
        employee={{ id: '', username: '', code: '', startDate: Date.now(), dui: '', position: '' }}
        setComponentEmployee={setComponentEmployee}
      />
    );
  }, []);

  useEffect(() => {
    FetchData(setEmployeeList);
  }, []);

  useEffect(() => {
    FetchData(setEmployeeList);
  }, [componentEmployee]);

  const body = <TrBody updateEmployee={updateEmployee} deleteEmployee={deleteEmployee} employeeList={employeeList} />;
  return (
    <>
      {notification.show && (
        <div className={`notification is-light ${notification.isSuccess ? 'is-primary' : 'is-danger'}`}>
          <button className='delete' onClick={() => setNotification({ show: false })}></button>
          {notification.message}
        </div>
      )}
      {loading && (
        <progress className='progress is-small is-info' max={100}>
          15%
        </progress>
      )}

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
        <tbody>{body}</tbody>
      </table>
      {componentEmployee}
    </>
  );
};

export default TableEmployee;
