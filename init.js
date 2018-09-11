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
        address: [
            "deliveryAddress",
            "quickDeliveryAddress",
            "quickDeliveryAddressStreet",
            "sites_client_addr"
        ]
    };

    var address = {
        city: ["deliveryCity", "quickDeliveryCity"],
        address: [
            "deliveryAddress",
            "quickDeliveryAddress",
            "quickDeliveryAddressStreet"
        ],
        postal: ["quickDeliveryZipCode", "deliveryZipCode"]
    };

    function executeEach(idList, action) {
        idList.forEach(function(id) {
            var $el = $("#" + id);
            if ($el.length) {
                action($el);
            }
        });
    }

    // initialize suggestions on all known fields
    function init() {
        initSuggestions();
        initDelivery();
    }

    function initSuggestions() {
        for (var type in fields) {
            initSuggestionsForType(type, fields[type]);
        }
    }

    function initSuggestionsForType(type, idList) {
        executeEach(idList, function($el) {
            $el.suggestions({
                serviceUrl: SERVICE_URL,
                token: TOKEN,
                partner: PARTNER,
                type: type.toUpperCase()
            });
        });
    }

    function initDelivery() {
        suggestCity(address.city, address.address, address.postal);
        suggestPostalCode(address.address, address.postal);
    }

    // constrain address by kladr id
    function setAddressConstraint(addressList, kladr_id) {
        executeEach(addressList, function($address) {
            $address.suggestions().setOptions({
                constraints: {
                    locations: { kladr_id: kladr_id }
                },
                restrict_value: true
            });
            $address.suggestions().clear();
        });
    }

    // clear address constraints
    function clearAddressConstraint(addressList) {
        executeEach(addressList, function($address) {
            $address.suggestions().setOptions({
                constraints: {},
                restrict_value: false
            });
            $address.suggestions().clear();
        });
    }

    // suggest city and restrict address accordingly
    // also fill postal code
    function suggestCity(cityList, addressList, postalList) {
        executeEach(cityList, function($city) {
            $city.suggestions({
                serviceUrl: SERVICE_URL,
                token: TOKEN,
                partner: PARTNER,
                type: "ADDRESS",
                hint: false,
                bounds: "city-settlement",
                onSelect: function(suggestion) {
                    setAddressConstraint(addressList, suggestion.data.kladr_id);
                    setPostalCode(
                        postalList,
                        "" || suggestion.data.postal_code
                    );
                },
                onSelectNothing: function() {
                    clearAddressConstraint(addressList);
                    setPostalCode(postalList, "");
                }
            });
        });
    }

    function setPostalCode(postalList, value) {
        executeEach(postalList, function($postal) {
            $postal.val(value);
        });
    }

    // fill postal code when address is selected
    function suggestPostalCode(addressList, postalList) {
        executeEach(addressList, function($address) {
            $address.suggestions().setOptions({
                onSelect: function(suggestion) {
                    setPostalCode(
                        postalList,
                        "" || suggestion.data.postal_code
                    );
                },
                onSelectNothing: function() {
                    setPostalCode(postalList, "");
                }
            });
        });
    }

    $(function() {
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
})(window.jQuery, window.DADATA_TOKEN);
