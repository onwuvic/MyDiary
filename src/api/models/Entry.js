import entries from './../../datastore';

const Entry = {
  findAll() {
    return new Promise((resolve, reject) => {
      const entry = entries;
      if(entry) {
        resolve(entry);
      } else {
        reject(Error('Server Error'));
      }
    });
  }
}

export default Entry;