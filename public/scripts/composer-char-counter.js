
$(document).ready(function () {

  $('textarea').on('input', function () {
    const maxlength = $(this).attr("maxlength") || 140;
    const currentLength = $(this).val().length;
    const counterVal = currentLength - maxlength;

    $('output[name="counter"]').val(0 - counterVal);

    if (counterVal > 0) {
      $('output[name="counter"]').css("color", "red");
    } else {
      $('output[name="counter"]').css("color", "inherit");
    }
  });
});