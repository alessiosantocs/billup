(function(){
  var billupConfig = {};
  var layouts = {
    st_123456780: "<div class='billup-content'><span class='billup-title'>Upgrade to Pro now!</span><div class='billup-well'><span class='billup-price-change'>Price increase: +5$ / month</span><span class='billup-payment-method'>Charged on card ending with 4111</span></div><button class='billup-button'>Confirm upgrade</button></div>",
    st_123456781: "<div class='billup-content'><span class='billup-title'>Get early access to Autopilot</span><div class='billup-well'><span class='billup-price-change'>Price increase: +5$ / month</span><span class='billup-payment-method'>Charged on card ending with 4111</span></div><button class='billup-button'>Confirm whatever</button></div>",
    st_123456782: "<div class='billup-content'><span class='billup-title'>Enable Messages feature</span><div class='billup-well'><span class='billup-price-change'>Price increase: +5$ / month</span><span class='billup-payment-method'>Charged on card ending with 4111</span></div><button class='billup-button'>Confirm add-on</button></div>",
    st_123456783: "<div class='billup-content'><span class='billup-title'>Request one-time service</span><div class='billup-well'><span class='billup-price-change'>You will be charged 150$ once</span><span class='billup-payment-method'>On card ending with 4111</span></div><button class='billup-button'>Confirm charge</button></div>"
  };
  var stripeCustomer;

  var stylesheet = document.createElement("link");
  stylesheet.rel="stylesheet";
  stylesheet.href="https://raw.githubusercontent.com/alessiosantocs/billup/master/main.css?token=AAUPQ6Y7N763ATN2WUQY76TAFI4V2";
  document.head.append(stylesheet);

  var background = document.createElement("div");

  // Closes all visible popups
  var closePopupsFn = function () {
    var popups = document.querySelectorAll(".billup-popup.billup-visible");
    for (var i = 0; i < popups.length; i++) {
      var popup = popups[i];
      popup.className = "billup-popup";
    }

    background.className = "billup-background";
  };

  // Initializes universal elements such as popup background
  var initFn = function (){

    background.className = "billup-background";
    document.body.append(background);
    background.addEventListener("click", closePopupsFn);

  };


  window.Billup = {
    config: function(props){
      billupConfig.stripe_customer_id = props.stripe_customer_id;
      billupConfig.billup_public_key = props.billup_public_key;
      initFn();
    },
    create: function(props){
      var layout = layouts[props.strategy_id];
      var targets = document.querySelectorAll(props.target);


      for (var i = 0; i < targets.length; i++) {
        var target = targets[i];
        var parent = target.parentElement;

        var popup = document.createElement("div");
        popup.className = "billup-popup";
        popup.innerHTML = layout;

        parent.append(popup);

        target.addEventListener("click", function(e){
          e.preventDefault();
          background.className = "billup-background billup-visible";
          popup.className = "billup-popup billup-visible";
        });
      }
    }
  };
})()
