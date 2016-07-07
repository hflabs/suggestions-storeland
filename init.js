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

  // initialize suggestions on all known fields
  function init() {
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
