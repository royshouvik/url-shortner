const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const url = new Schema({
  url: { type: 'String', required: true },
  redirectUrl: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

module.exports=mongoose.model('URL', url);
