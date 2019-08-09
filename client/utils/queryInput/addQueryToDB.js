import db from '../../db';

const addQueryToDB = (textValue, urlToSend) => new Promise((resolve, reject) => {
  // console.log('running addQueryToDB');
  db.history.put({
    query: textValue,
    endpoint: urlToSend,
  })
    .then(() => {
      // console.log('Sent to database.');
      resolve('Sent to database.');
    })
    .catch((e) => {
      // console.log('Error adding query to database. ', e);
      reject(new Error('Error addding query to database.'));
    });
});

export default addQueryToDB;
