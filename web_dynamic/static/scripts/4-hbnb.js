$(document).ready(init);

let carry = {};

function init () {
  $('input').click(function () {
    carry = checkedList();
  });
  apiStatus();
  $('button').click(function () {
    searchPlaces(carry);
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

function searchPlaces (carry) {
  $.ajax({
    type: 'POST',
    url: 'http://cc5333933a49.6ed948a4.hbtn-cod.io:5001/api/v1/places_search/',
    data: JSON.stringify({
      amenities: Object.values(carry)
    }),
    dataType: 'json',
    contentType: 'application/json',
    success: function (response) {
      $('SECTION.places').empty();
      for (const r of response) {
        const article = ['<article>',
          '<div class="title_box">',
          `<h2>${r.name}</h2>`,
          `<div class="price_by_night">$${r.price_by_night}</div>`,
          '</div>',
          '<div class="information">',
          `<div class="max_guest">${r.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${r.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${r.number_bathrooms} Bathroom(s)</div>`,
          '</div>',
          '<div class="description">',
          `${r.description}`,
          '</div>',
          '<div class="reviews"><h2>',
          `<span id="${r.id}n" class="treview">Reviews</span>`,
          `<span id="${r.id}" onclick="showReviews(this)">Show</span></h2>`,
          `<ul id="${r.id}r"></ul>`,
          '</div>',
          '</article>'];
        $('SECTION.places').append(article.join(''));
      }
    }
  });
}
