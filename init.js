"use strict";

(function($, TOKEN) {

  // do not change below this line
  var SERVICE_URL = "https://suggestions.dadata.ru/suggestions/api/4_1/rs";
  var PARTNER = "STORELAND";
  var AJAX_DELAY_MS = 2000;
  var QUICK_ORDER_BTN_ID = "#startOrder";

  // Storeland function, exposed as global
  var storelandQuickOrderFn = window.startOrder;

  var fields = {
    name: ["reg_name", "feedback_name", "callback_person"],
    email: ["contactEmail", "sites_client_mail", "feedback_email", "email"],
    address: ["deliveryAddress", "quickDeliveryAddress", "sites_client_addr"]
  };
  var deliveryAddressSelectors = "#quickDeliveryAddress, #deliveryAddress";
  var deliveryCitySelectors = "#quickDeliveryCity, #deliveryCity";
  var deliveryPostalSelectors = "#quickDeliveryZipCode, #deliveryZipCode";

  // initialize suggestions on all known fields
  function init() {
    initSuggestions();
    initDelivery();
  }

  function initSuggestions() {
    for (var type in fields) {
      fields[type].forEach(function (id) {
        $("#"+id).suggestions({
          serviceUrl: SERVICE_URL,
          token: TOKEN,
          partner: PARTNER,
          type: type.toUpperCase()
        });
      });
    }
  }

  function initDelivery() {
    var $city = $(deliveryCitySelectors);
    var $address = $(deliveryAddressSelectors);
    var $postalCode = $(deliveryPostalSelectors);
    suggestCity($city, $address, $postalCode);
    suggestPostalCode($address, $postalCode);
  }

  // constrain address by kladr id
  function setAddressConstraint(kladr_id, $address) {
    $address.suggestions().setOptions({
      constraints: {
        locations: { kladr_id: kladr_id }
      },
      restrict_value: true
    });
  }

  // clear address constraints
  function clearAddressConstraint($address) {
    $address.suggestions().setOptions({
      constraints: {},
      restrict_value: false
    });
  }

  // suggest city and restrict address accordingly
  // also fill postal code
  function suggestCity($city, $address, $postalCode) {
    if (!$city.length) {
      return;
    }
    $city.suggestions({
      serviceUrl: SERVICE_URL,
      token: TOKEN,
      partner: PARTNER,
      type: "ADDRESS",
      hint: false,
      bounds: "city-settlement",
      onSelect: function(suggestion) {
        setAddressConstraint(suggestion.data.kladr_id, $address);
        $address.suggestions().clear();
        $postalCode.val("" || suggestion.data.postal_code);
      },
      onSelectNothing: function() {
        clearAddressConstraint($address);
        $address.suggestions().clear();
        $postalCode.val("");
      }
    });
  }

  // fill postal code when address is selected
  function suggestPostalCode($address, $postalCode) {
    if (!$postalCode.length || !$address.length) {
      return;
    }
    $address.suggestions().setOptions({
      onSelect: function(suggestion) {
        $postalCode.val("" || suggestion.data.postal_code);
      },
      onSelectNothing: function() {
        $postalCode.val("");
      }
    });
  }

  $(function () {
    init();
  });

  // quick order form is loaded via AJAX after button click
  $(QUICK_ORDER_BTN_ID)
    .off()
    .on("click", function(e) {
      storelandQuickOrderFn();
      window.setTimeout(init, AJAX_DELAY_MS);
      return false;
    });

}(window.jQuery, window.DADATA_TOKEN))
