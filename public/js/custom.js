// OTP-VERIFICATION

$(".inputs").keyup(function () {
  if (this.value.length == this.maxLength) {
    $(this).next(".inputs").focus();
  }
  if (this.value.length == 0) $(this).prev(".inputs").focus();
});

// OTP-VERIFICATION

// HEART

$(document).ready(function () {
  $(".heart-icon-wrap").click(function () {
    $(".heart-icon-wrap img").not(
      $(this).parent().find(".heart-icon-wrap img").toggleClass("active")
    );
  });
});

// HEART

// ON RELOAD PAGE POPUP

$(window).ready(function () {
  setTimeout(function () {
    $("#breeder-guide").modal("show");
  }, 3000);
});

// ON RELOAD PAGE POPUP

// DROPDOWN

$(document).ready(function () {
  $(".influ-drop-btn").click(function (event) {
    $(".influ-drop-list")
      .not($(this).parent().find(".influ-drop-list").slideToggle("fast"))
      .slideUp();
    event.stopPropagation();
  });

  $(".influ-drop-btn").click(function () {
    $(".far")
      .not($(this).parent().find(".far").toggleClass("active"))
      .removeClass("active");
  });

  $(document).click(function (event) {
    $(".influ-drop-list").slideUp("fast");
    $(".far").removeClass("active");
  });
  $(".influ-drop-list").click(function (event) {
    event.stopPropagation();
  });
});

// DROPDOWN

// NOTIFICATION

$(document).ready(function () {
  $(".notification-in button").click(function (event) {
    $(".notification-list").slideToggle("fast");
    event.stopPropagation();
  });
  $(document).click(function (event) {
    $(".notification-list").slideUp("fast");
    event.stopPropagation();
  });
  $(".notification-list").click(function (event) {
    event.stopPropagation();
  });
});

//
// $(function () {
//     $("#datepicker").datepicker();
//     $("#datepicker2").datepicker();
// });

//
// $(document).ready(function () {
//   $(".quotes2 .dropdown-filterbtn").click(function (event) {
//     $(".dropdown-showfilter")
//       .not($(this).parent().find(".dropdown-showfilter").toggle())
//       .hide();
//     event.stopPropagation();
//   });
//   $(document).click(function () {
//     $(".dropdown-showfilter").hide();
//   });
//   $(".dropdown-showfilter").click(function (event) {
//     event.stopPropagation();
//   });
// });

$(document).ready(function () {
  $(".quotes2 .dropdown-filterbtn").click(function (event) {
    var dropdown = $(this).parent().find(".dropdown-showfilter");
    $(".dropdown-showfilter").not(dropdown).hide();
    dropdown.toggle();
    event.stopPropagation();
  });
});
