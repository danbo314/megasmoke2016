function submitRegistration() {
  var form = $('form[name="register"]'),
      participant = new Participant();

  participant.save({
      fullName: form.find('input[name="fullName"]').val(),
      email: form.find('input[name="email"]').val(),
      nickName: form.find('input[name="nickName"]').val(),
      gradYear: form.find('input[name="gradYear"]').val(),
      attending: form.find('input[name="attendance"]').val(),
      numPeople: form.find('input[name="members"]').val(),
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
        returnString += results[i].get('fullName') + ' - ' + results[i].get('nickName') + results[i].get('gradYear') + ' - ' +
                        results[i].get('attending') + ' - ' + results[i].get('numPeople') + '\n';
      }
      alert(returnString);
    },
    error: function(error) {
      alert("Could not find registrations "+error.code+" "+error.message);
    }
  });
}
