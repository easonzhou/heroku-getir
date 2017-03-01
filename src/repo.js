module.exports = (db) => {
  const records = db.collection('records');

  return {
    /**
     * Finds given record by the key.
     * @param key {String}
     * @return {Cursor}
     */
    findRecordByKey: (key) => {
      return records.findOne({ key }, { key: 1, value: 1, createdAt: 1, _id: 0 });
    }
  };
};