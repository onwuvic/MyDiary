import entries from './../../datastore';
import uniqid from 'uniqid';
//Status 0: trash, 1: active, 2: archive

const Entry = {
  findAll() {
    return new Promise((resolve, reject) => {
      // get all the entries in datastore
      const entry = entries;
      if(entry) {
        resolve(entry);
      } else {
        reject(Error('Server Error'));
      }
    });
  },

  create(entry) {
    return new Promise((resolve, reject) => {
      const id = uniqid();

      // set the id and set a default status value of 1(active)
      const newEntry = {
        id,
        title: entry.title,
        body: entry.body,
        feature_image: entry.feature_image,
        status: 1
      };

      // push the new entry to our datastore "entries"
      entries.push(newEntry);

      //find the newly created entry with its id
      const createdEntry = this.findEntry(id);
      if(createdEntry) {
        resolve(createdEntry);
      } else {
        reject(Error('Server Error'));
      }
    });
  },

  findOne(id) {
    return new Promise((resolve, reject) => {
      const entry = this.findEntry(id);
      if(entry) {
        resolve(entry);
      } else {
        reject(Error('No Entry Was Found'));
      }
    });
  },

  // method find entry in the entries array by id and return its value
  findEntry(id) {
    return entries.find(entry => entry.id == id);
  }
}

export default Entry;