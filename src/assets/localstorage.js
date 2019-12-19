const key = "addkey"
var storageObjece = {
  set: function(items) {
    localStorage.setItem(key, JSON.stringify(items))
  },
  get: function() {
    var val = localStorage.getItem(key) || '[]';
      val = JSON.parse(val);
      return val
  }

}

export default storageObjece