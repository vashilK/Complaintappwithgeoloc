  $(function() {

    $("#fname_er").hide();
    $("#sname_er").hide();
    $("#nic_er").hide();
    $("#addr_er").hide();
    $("#dist_er").hide();
    $("#email_er").hide();
    $("#pass_er").hide();
    $("#cpass_er").hide();



    var err_fname = false;
    var err_sname = false;
    var err_nic = false;
    var err_addr = false;
    var err_dist = false;
    var err_email = false;
    var err_pass = false;
    var err_cpass = false;



    $("#fname").focusout(function() {
      check_fname();
    });

    $("#sname").focusout(function() {
      check_sname();
    });

    $("#email").focusout(function() {
      check_email();
    });
    $("#nic").focusout(function() {
      check_nic();
    });

    $("#add").focusout(function() {
      check_addr();
    });

    $("#choose").focusout(function() {
      check_dist();
    });
    $("#pass").focusout(function() {
      check_pass();
    });

    $("#cpass").focusout(function() {
      check_cpass();
    });




    //validation for Firstname
    function check_fname() {

      var pattern = /^[a-zA-Z]*$/;
      var fname = $("#fname").val();
      if (pattern.test(fname) && fname !== '') {
        $("#fname_er").hide();
        $("#fname").css("border-bottom", "2px solid green");

      } else if (fname === '') {

        $("#fname").css("border-bottom", "2px solid red");

      } else {
        $("#fname_er").html("Name should contain only characters");
        $("#fname_er").show('slow').delay(3000).hide('slow');
        $("#fname").css("border-bottom", "2px solid red");
        err_fname = true;
      }

    }

    //validation for surname
    function check_sname() {

      var pattern = /^[a-zA-Z]*$/;
      var sname = $("#sname").val();
      if (pattern.test(sname) && sname !== '') {
        $("#sname_er").hide();
        $("#sname").css("border-bottom", "2px solid green");

      } else if (sname === '') {

        $("#sname").css("border-bottom", "2px solid red");

      } else {
        $("#sname_er").html("Surname should contain only characters");
        $("#sname_er").show('slow').delay(3000).hide('slow');
        $("#sname").css("border-bottom", "2px solid red")
        err_sname = true;
      }

    }

    //Validation for NIC
    function check_nic() {

      var pattern = /^[A-Z]\d{12}[A-Z]$/;
      var nic = $("#nic").val();
      if (pattern.test(nic) && nic !== '') {
        $("#nic_er").hide();
        $("#nic").css("border-bottom", "2px solid green");

      } else if (nic === '') {

        $("#nic").css("border-bottom", "2px solid red");

      } else {
        $("#nic_er").html("NIC should be in this format : R160597123456D");
        $("#nic_er").show('slow').delay(3000).hide('slow');
        $("#nic").css("border-bottom", "2px solid red")
        err_nic = true;
      }

    }


    //validation for Address
    function check_addr() {

      var pattern = /^[A-z]+\s[A-z]+/; // /^\s[A-z]+\s[A-z]/
      var add = $("#add").val();
      if (pattern.test(add) && add !== '') {
        $("#add_er").hide();
        $("#add").css("border-bottom", "2px solid green");

      } else if (add === '') {
        $("#add").css("border-bottom", "2px solid red");

      } else {
        $("#add_er").html("Address is required");
        $("#add_er").show('slow').delay(3000).hide('slow');
        $("#add").css("border-bottom", "2px solid red")
        err_addr = true;
      }

    }


    //validation for District
    function check_dist() {


      var dist = $('input[name=chose]:checked').val();


      if (dist != null) {
        $("#dist_er").hide();
        $("#choose").css("border-bottom", "2px solid green");



      } else {
        $("#dist_er").html("A district should be selected");
        $("#dist_er").show('slow').delay(3000).hide('slow');
        $("#choose").css("border-bottom", "2px solid red")
        err_dist = true;



      }

    }


    //validation for email
    function check_email() {

      var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      var email = $("#email").val();
      if (pattern.test(email) && email !== '') {
        $("#email_er").hide();
        $("#email").css("border-bottom", "2px solid green");

      } else if (email === '') {

        $("#email").css("border-bottom", "2px solid red");

      } else {
        $("#email_er").html("Must be in this format : Dooshyant@gmail");
        $("#email_er").show('slow').delay(3000).hide('slow');
        $("#email").css("border-bottom", "2px solid red")
        err_addr = true;
      }

    }


    //validation for Password
    function check_pass() {

      var p_length = $("#pass").val().length;

      if (p_length < 8) {
        $("#pass_er").html("Atleast 8 characters");
        $("#pass_er").show('slow').delay(3000).hide('slow');
        $("#pass").css("border-bottom", "2px solid red")
        err_pass = true;

      } else if (pass === '') {

        $("#pass").css("border-bottom", "2px solid red");

      } else {
        $("#pass_er").hide();
        $("#pass").css("border-bottom", "2px solid green");

      }

    }

    function check_cpass() {

      var pass = $("#pass").val();
      var cpass = $("#cpass").val();

      if (pass !== cpass) {
        $("#cpass_er").html("Password did not match");
        $("#cpass_er").show('slow').delay(3000).hide('slow');
        $("#cpass").css("border-bottom", "2px solid red")
        err_cpass = true;

      } else if (cpass === '') {

        $("#cpass").css("border-bottom", "2px solid red");

      } else {
        $("#cpass_er").hide();
        $("#cpass").css("border-bottom", "2px solid green");

      }

    }







/*
    $("#regsub").click(function() {


      err_fname = false;
      err_sname = false;
      err_nic = false;
      err_addr = false;
      err_dist = false;
      err_email = false;
      err_pass = false;
      err_cpass = false


      check_fname();
      check_sname();
      check_email();
      check_nic();
      check_addr();
      check_dist();
      check_pass();
      check_cpass();

      if (err_fname === false && err_sname === false && err_nic === false && err_addr === false &&
        err_dist === false && err_email === false && err_pass === false && err_cpass === false) {
        return true;
      } else {
        alert("Please fill in the form correctly");
        return false;
      }


    });

*/






  });
