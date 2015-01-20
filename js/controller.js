function submitRegistration() {
  var form = $('form[name="register"]');
  var participant = new Participant();
  participant.save({
    fullName: form.find('input[name="fullName"]').val(),
    nickName: form.find('input[name="nickName"]').val()
  }, {
    success: function(participant) {
      $('div.button#toggleShow').click();
    },
    error: function(participant) {
      alert('sorry could not save your information');
    }
  });
}

function getRegistrations() {
  var query = new Parse.Query(Participant);
  query.find({
    success: function(results) {
      var returnString = "got "+results.length+" results\n";
      for (var i = 0; i < results.length; i++) {
        returnString += results[i].get('fullName') + ' - ' + results[i].get('nickName') + '\n';
      }
      alert(returnString);
    },
    error: function(error) {
      alert("Could not find registrations "+error.code+" "+error.message);
    }
  });
}
