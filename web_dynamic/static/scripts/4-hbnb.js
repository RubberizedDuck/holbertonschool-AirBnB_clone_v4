$(document).ready(init);

const amenityObj = {};
let checkList = {};

function init () {
  $('input').click(function () {
    checkList = amenityObj;
    checkedList.call(this);
  });
  apiStatus();
  origSearch();
  searchPlaces();
}

function checkedList () {
  if ($(this).is(':checked')) {
    checkList[$(this).attr('data-id')] = $(this).attr('data-name');
  } else if (!$(this).is(':checked')) {
    delete checkList[$(this).attr('data-id')];
  }
  const amenities = Object.values(checkList);
  $('.amenities h4').text(amenities.join(', '));
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
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://cc5333933a49.6ed948a4.hbtn-cod.io:5001/api/v1/places_search/',
      data: JSON.stringify({
        amenities: Object.values(amenityObj)
      }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        $('.places').empty();
        data.forEach((place) => {
          let html = '';
          html += '		<article>';
          html += '	  		<div class="title_box">';
          html += '	    		<h2>' + place.name + '</h2>';
          html += '	    		<div class="price_by_night">' + place.price_by_night + '</div>';
          html += '	  		</div>';
          html += '	  		<div class="information">';
          html += '	    		<div class="max_guest">' + place.max_guest + ' Guest';
          if (place.max_guest !== 1) {
            html += 's';
          }
          html += '</div>';
          html += '            	<div class="number_rooms">' + place.number_rooms + ' Bedroom';
          if (place.number_rooms !== 1) {
            html += 's';
          }
          html += '</div>';
          html += '            	<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom';
          if (place.number_bathrooms !== 1) {
            html += 's';
          }
          html += '</div>';
          html += '	  		</div>';
          html += '	  		<div class="user">';
          html += '          	</div>';
          html += '          	<div class="description">';
          html += '	    	' + place.description;
          html += '          	</div>';
          html += '		</article>';
          $('section.places').append($(html));
        });
      }
    });
  });
}
function origSearch () {
  $.ajax({
    type: 'POST',
    url: 'http://cc5333933a49.6ed948a4.hbtn-cod.io:5001/api/v1/places_search/',
    data: JSON.stringify({}),
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
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
