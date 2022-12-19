$(window).on('load', function () {
  $("input[type='checkbox']").change(function () {
    const checkList = {};
    if ($(this).is(':checked')) {
      checkList[$(this).data('id')] = $(this).data('name');
    } else {
      delete checkList[$(this).data('id')];
    }
    const checked = [];
    for (const check in checkList) {
      checked.push(checkList[check]);
    }
    $('.amenities h4').text(checked.join(', '));
  });
});
