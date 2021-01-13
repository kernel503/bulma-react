import React, { useCallback, useState, useEffect } from 'react';
import { getAllEmployee } from '../ServiceContentful/contentful-delivery';
import { getAllEmployee } from '../ServiceContentful/contentful-delivery';

const FetchData = async (setOption) => {
  const response = await getAllEmployee();
  const rows = response.items.map((currentValue) => {
    const {
      sys: { id },
      fields: { username },
    } = currentValue;
    return { id, username };
  });
  setOption(rows);
};

const PostData = async (data, setMessage) => {
  const response = await getAllEmployee();
};

const FormDisability = () => {
  const [option, setOption] = useState([]);
  const optionEmployee = option.map(({ id, username }) => {
    return (
      <option key={id} value={id}>
        {username}
      </option>
    );
  });

  const formSubmit = useCallback((event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filterData = [...formData.entries()].reduce((acccum, current) => {
      const [key, value] = current;
      if (key === 'initiate' || key === 'end') {
        return { ...acccum, [key]: new Date(value) === 'Invalid Date' || Date.now() };
      }
      return { ...acccum, [key]: value };
    }, {});
    console.log(filterData);
  }, []);

  useEffect(() => FetchData(setOption), []);

  return (
    <form onSubmit={formSubmit} id='formSubmit'>
      <div className='columns'>
        <div className='column'>
          <div className='field'>
            <label className='label'>Medical Unit</label>
            <div className='control'>
              <input className='input' type='text' name='medicalUnit' />
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='field'>
            <label className='label'>Dr.</label>
            <div className='control'>
              <input className='input' type='text' name='doctor' />
            </div>
          </div>
        </div>
      </div>
      <div className='columns'>
        <div className='column'>
          <div className='field'>
            <label className='label'>Initial Date</label>
            <div className='control'>
              <input className='input' type='date' name='initiate' />
            </div>
          </div>
        </div>
        <div className='column'>
          <div className='field'>
            <label className='label'>End Date</label>
            <div className='control'>
              <input className='input' type='date' name='end' />
            </div>
          </div>
        </div>
      </div>
      <div className='columns'>
        <div className='column '>
          <div className='field'>
            <label className='label'>Employee</label>
            <div className='control'>
              <div className='select is-medium'>
                <select name='employee'>{optionEmployee}</select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='buttons'>
        <button className='button is-dark' type='reset'>
          Clean
        </button>
        <button className='button is-info' type='submit'>
          Create
        </button>
      </div>
    </form>
  );
};

export default FormDisability;
