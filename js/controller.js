var $form,
    $fullName,
    $email,
    $nickName,
    $gradYear,
    $attendance,
    $numPeople,
    $emailStatus,
    $gradYearStatus,
    $submitError,
    verifiableFields;

$(function () {
    $form = $('form[name="register"]');
    $fullName = $form.find('input[name="fullName"]');
    $email = $form.find('input[name="email"]');
    $nickName = $form.find('input[name="nickName"]');
    $gradYear = $form.find('input[name="gradYear"]');
    $attendance = $form.find('input[name="attendance"]');
    $numPeople = $form.find('input[name="members"]');
    $emailStatus = $("#emailStatus");
    $gradYearStatus = $("#gradYearStatus");
    $submitError = $("#submitError");

    verifiableFields = [
        $fullName,
        $email,
        $nickName,
        $gradYear,
    ];
});

function updateSliderBox(val, sclass) {
    $("form > span."+sclass).text(val);
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}

function checkContent() {
    var valid = true,
        i,
        flen = verifiableFields.length,
        $field;

    for (i = 0; i < flen; i++) {
        $field = verifiableFields[i];

        if($field.val().length === 0) {
            $field.addClass("error");
            valid = false;
        }
        else {
            $field.addClass("success");
        }
    }

    return valid;
}

function checkGradYear(year) {
    return (year > 1990 && year < 2025);
}

function validateAndRegister() {
    if (checkContent() && isValidEmailAddress($email.val()) && checkGradYear($gradYear.val())) {
        submitRegistration();
    }
    else {
        $submitError.show();
    }
}

function submitRegistration() {
  var participant = new Participant();

  participant.save({
      fullName: $fullName.val(),
      email: $email.val(),
      nickName: $nickName.val(),
      gradYear: parseInt($gradYear.val()),
      attending: parseInt($attendance.val()),
      numPeople: parseInt($numPeople.val()),
  }, {
    success: function(participant) {
        $form[0].reset();
        $emailStatus.hide();
        $gradYearStatus.hide();
        $form.find("input[type='text']").removeClass("success");
        $('div.button#toggleShow').click();
        $("#regSuccess").show();
        setTimeout(function() {
            $("#regSuccess").hide();
        }, 6000);
    },
    error: function(participant, error) {
        alert('sorry could not save your information: ' + error.message);
    }
  });
}

function getAllYears(callback) {
  getRegistrations(false, function(data) {
    var distinctYears = [];
      for (var i = 0; i < data.length; i++) {
        if ($.inArray(data[i].gradYear, distinctYears) < 0) {
          distinctYears.push(data[i].gradYear);
        }
      }
    callback(distinctYears);
  });

}

function getRegistrations(filter, callback) {
    var query = new Parse.Query(Participant);
    if (filter) {
        if (typeof filter.gradYear !== 'undefined' && filter.gradYear) {
            query.equalTo('gradYear', parseInt(filter.gradYear));
        }
    }
    query.addAscending("gradYear");
    query.find({
        success: function(results) {
            var returnArray = [];

            for (var i = 0; i < results.length; i++) {
                returnArray.push(results[i].toJSON());
            }
            callback(returnArray);
        },
        error: function(error) {
            return false;
        }
    });
}

