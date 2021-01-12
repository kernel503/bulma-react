import { createClient } from 'contentful';
//TOKEN content delivery api
const accessToken = 'TWRBagj1wP3F04UGLRoB_WlE-J18Nc5izp2qpcZyWJw';
const environment = 'master';
const space = 'agv5h5fnr06l';
const contentTypeEmployee = 'employee';
const contentTypeDisability = 'disability';
const client = createClient({ accessToken, environment, space });

/**
 * Get list of employees.
 * @param {string} contentType contentType.
 * @return {Promise} The result of fetching data.
 */
const fetchData = (contentType) => {
  return new Promise((resolve, reject) => {
    client
      .getEntries({
        content_type: contentType,
      })
      .then((response) =>
        resolve(
          response.items.map((currentValue) => {
            const {
              sys: { id },
              fields: { username, code, startDate, dui, position },
            } = currentValue;
            return { id, username, code, startDate, dui, position };
          })
        )
      )
      .catch((error) => reject(new Error(error)));
  });
};

const getAllEmployee = fetchData(contentTypeEmployee);
const getAllDisability = fetchData(contentTypeDisability);
export { getAllEmployee, getAllDisability };
