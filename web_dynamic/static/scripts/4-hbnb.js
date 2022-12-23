$(document).ready(init);

const amenityObj = {};
let checkList = {};

function init () {
  $('input').click(function () {
    checkList = amenityObj;
    checkedList.call(this);
  });
  apiStatus();
  $('button').click(function () {
    searchPlaces();
  });
}

function checkedList () {
  const checkList = {};
  if ($(this).is(':checked')) {
    checkList[$(this).attr('data-id')] = $(this).attr('data-name');
  } else if (!$(this).is(':checked')) {
    delete checkList[$(this).attr('data-id')];
  }
  const amenities = Object.values(checkList);
  $('.amenities h4').text(amenities.join(', '));
  return checkList;
}

function apiStatus () {
  $.get('http://cc5333933a49.6ed948a4.hbtn-cod.io:5001/api/v1/status/', function (body) {
    if (body.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

function searchPlaces () {
  $.ajax({
    amenity = checkedList();
    type: 'POST',
    url: 'http://cc5333933a49.6ed948a4.hbtn-cod.io:5001/api/v1/places_names/',
    data: JSON.stringify({
      amenities: Object.values(amenityObj)
    }),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('.places').empty();
      const renderTitleBox = (place) => {
        let html = '';
        html += '<div class="title_box">';
        html += '  <h2>' + place.name + '</h2>';
        html += '  <div class="price_by_night">' + place.price_by_night + '</div>';
        html += '</div>';
        return html;
      };
      const renderInformation = (place) => {
        let html = '';
        html += '<div class="information">';
        html += '  <div class="max_guest">' + place.max_guest + pluralize(' Guest', place.max_guest);
        html += '  </div>';
        html += '  <div class="number_rooms">' + place.number_rooms + pluralize(' Bedroom', place.number_rooms);
        html += '  </div>';
        html += '  <div class="number_bathrooms">' + place.number_bathrooms + pluralize(' Bathroom', place.number_bathrooms);
        html += '  </div>';
        html += '</div>';
        return html;
      };
      const renderUser = () => {
        let html = '';
        html += '<div class="user">';
        html += '</div>';
        return html;
      };
      const renderDescription = (place) => {
        let html = '';
        html += '<div class="description">' + place.description;
        html += '</div>';
        return html;
      };
      data.forEach((place) => {
        let html = '';
        html += '<article>';
        html += renderTitleBox(place);
        html += renderInformation(place);
        html += renderUser();
        html += renderDescription(place);
        html += '</article>';
        $('section.places').append($(html));
      });
    }
  });
}
