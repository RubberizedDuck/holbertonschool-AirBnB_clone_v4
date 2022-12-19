$(window).on('load', function () {
  $('input:checkbox').css('margin-right', '10px');
  $("input[type='checkbox']").click(function () {
    const checkList = {};
    if ($(this).is(':checked')) {
      checkList[$(this).attr('data-id')] = $(this).attr('data-name');
    } else if (!$(this).is(':checked')) {
      delete checkList[$(this).attr('data-id')];
    }
    const isChecked = [];
    for (const check in checkList) {
      isChecked.append(checkList[check]);
    }
    $('.amenities h4').text(isChecked.join(', '));
  });
});
