import React, { useEffect, useState } from 'react';
const data = [
  {
    id: '1PZWyMCHgY5PejxMbGAmJ4',
    dateAdmission: 1610312739091,
    medicalUnit: 'General',
    doctor: 'Good Doctor',
    initiate: 1609564530000,
    end: 1609912800000,
    employee: {
      username: 'Kernel',
      code: 'SAJKCksjlsdewu',
      startDate: '2021-01-13T00:00-06:00',
      dui: '999999-2',
      position: 'Gerente GENERAL',
    },
  },
  {
    id: '4B9G1oZeZBUUZgUltlPlUj',
    dateAdmission: 1610315341046,
    medicalUnit: 'Especialidad',
    doctor: 'The Good Doctor',
    initiate: 1609564530000,
    end: 1609912800000,
    employee: {
      username: 'Kernel',
      code: 'SAJKCksjlsdewu',
      startDate: '2021-01-13T00:00-06:00',
      dui: '999999-2',
      position: 'Gerente GENERAL',
    },
  },
  {
    id: '3ZWfHjmKVJfSaPSxDagYev',
    dateAdmission: 1610313586893,
    medicalUnit: 'General',
    doctor: 'Good Doctor',
    initiate: 1609564530000,
    end: 1609912800000,
    employee: {
      username: 'Carlos (Kernel)',
      code: 'SAJKCksjlsdewu',
      startDate: 1610297620981,
      dui: '999999-2',
      position: 'Investigador',
    },
  },
  {
    id: '6OZhZbs7hsSNfrK04Bbdj7',
    dateAdmission: 1610312669264,
    medicalUnit: 'UCB',
    doctor: 'Good Doctor',
    initiate: 1609564530000,
    end: 1609912800000,
    employee: {
      username: 'DR. Dre',
      code: 'OJKCSA-15',
      startDate: 1610320425246,
      dui: '55555-12',
      position: 'Doctor',
    },
  },
];

const BodyTable = ({ dataRow }) => {
  const data = dataRow.map((element) => {
    const {
      id,
      dateAdmission,
      medicalUnit,
      doctor,
      initiate,
      end,
      employee: { username },
    } = element;

    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(initiate);
    const secondDate = new Date(end);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    const row = (
      <tr key={id}>
        <td className='subtitle has-text-centered is-6 p-0 m-0'>
          {new Date(dateAdmission).toISOString().split('T')[0]}
        </td>
        <td className='subtitle has-text-centered is-6 p-0 m-0'>{medicalUnit}</td>
        <td className='subtitle has-text-centered is-6 p-0 m-0'>{doctor}</td>
        <td>
          <p className='subtitle has-text-centered is-6 p-0 m-0'>{firstDate.toISOString().split('T')[0]}</p>
          <p className='subtitle has-text-centered is-6 p-0 m-0'>{secondDate.toISOString().split('T')[0]}</p>
          <p className='subtitle has-text-centered is-6 p-0 m-0'>{diffDays}</p>
        </td>
        <td className='subtitle has-text-centered is-6 p-0 m-0'>{username}</td>
        <td>
          <p className='buttons'>
            <button className='button is-small is-danger is-outlined'>
              <span className='icon is-small'>
                <i className='fas fa-user-times' />
              </span>
            </button>
          </p>
        </td>
      </tr>
    );
    return row;
  });
  return data;
};

const TableDisability = () => {
  const [dataRow, setDataRow] = useState(data);
  return (
    <table className='table is-fullwidth is-hoverable'>
      <thead>
        <tr>
          <th className='has-text-centered'>Date Register</th>
          <th className='has-text-centered'>Medical Unit</th>
          <th className='has-text-centered'>Dr.</th>
          <th className='has-text-centered'>Days of Disability</th>
          <th className='has-text-centered'>Employee</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <BodyTable dataRow={dataRow} />
      </tbody>
    </table>
  );
};

export default TableDisability;
