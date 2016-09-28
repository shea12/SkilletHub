let helpers = require(`${__dirname}/../helpers.js`);

module.exports = {
  // Description: Makes a new version from an existing version
  // Input: 
  //   req.body: {
  //     previous: { previous version },
  //     changes: { changes }
  //   }
  // Output: Created version
  createVersion: (req, res) => {
    helpers.makeVersion(req.body.previous, req.body.changes)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(error => {
      res.status(500).send(error)
    });
  },

  //gets a specific version
  getVersion: (req, res) => {
    helpers.retrieveVersion()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(error => {
      res.status(404).send(error)
    })
  },
  
  //removes versions with no downstream, makes others unavailable
  deleteVersion: (req, res) => {

  }
};