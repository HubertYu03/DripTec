// importing libraries
import { lazy, useEffect, useState } from "react";
import { supabase } from "../../Client";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

// importing styles
import "./CartCheckout.css";
const CartCard = lazy(() => import("../../Components/CartCard/CartCard"));

const CartCheckout = () => {
  let navigate = useNavigate();

  // State for the current shopping cart
  const [cart, setCart] = useState([]);

  // State for if there are orders already
  const [confirmedOrder, setConfirmedOrder] = useState(false);

  // States for calculating price
  const [preTax, setPreTax] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [applyShippingFee, setApplyShippingFee] = useState(true);
  const shippingFee = 3.99;

  // Email
  const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const [validEmail, setValidEmail] = useState();
  const [userEmail, setUserEmail] = useState("");

  const handleEmail = (event) => {
    setUserEmail(event.target.value);
    if (!emailRegex.test(event.target.value)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  // Address validation
  // Name
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Street Address
  const [deliveryStreetAddress, setDeliveryStreetAddress] = useState("");

  // Aparment/Unit
  const [deliveryApartment, setDeliveryApartment] = useState("");

  // City
  const [deliveryCity, setDeliveryCity] = useState("");

  // Zip Code
  const [deliveryZipCode, setDeliveryZipCode] = useState("");
  const [validZipCode, setValidZipCode] = useState();
  const ZipCodeEx = /[0-9]{5}/;

  const handleZipCode = (event) => {
    setDeliveryZipCode(event.target.value);
    if (!ZipCodeEx.test(event.target.value) || event.target.value.length != 5) {
      console.log("Invalid Zip Code");
      setValidZipCode(false);
    } else {
      console.log("Valid Zip Code");
      setValidZipCode(true);
    }
  };

  // State
  const [deliveryState, setDeliveryState] = useState("");
  const [defaultStatePos, setDefaultStatePos] = useState(0);

  const states = [
    {
      name: "Alabama",
      abbreviation: "AL",
    },
    {
      name: "Alaska",
      abbreviation: "AK",
    },
    {
      name: "American Samoa",
      abbreviation: "AS",
    },
    {
      name: "Arizona",
      abbreviation: "AZ",
    },
    {
      name: "Arkansas",
      abbreviation: "AR",
    },
    {
      name: "California",
      abbreviation: "CA",
    },
    {
      name: "Colorado",
      abbreviation: "CO",
    },
    {
      name: "Connecticut",
      abbreviation: "CT",
    },
    {
      name: "Delaware",
      abbreviation: "DE",
    },
    {
      name: "District Of Columbia",
      abbreviation: "DC",
    },
    {
      name: "Federated States Of Micronesia",
      abbreviation: "FM",
    },
    {
      name: "Florida",
      abbreviation: "FL",
    },
    {
      name: "Georgia",
      abbreviation: "GA",
    },
    {
      name: "Guam",
      abbreviation: "GU",
    },
    {
      name: "Hawaii",
      abbreviation: "HI",
    },
    {
      name: "Idaho",
      abbreviation: "ID",
    },
    {
      name: "Illinois",
      abbreviation: "IL",
    },
    {
      name: "Indiana",
      abbreviation: "IN",
    },
    {
      name: "Iowa",
      abbreviation: "IA",
    },
    {
      name: "Kansas",
      abbreviation: "KS",
    },
    {
      name: "Kentucky",
      abbreviation: "KY",
    },
    {
      name: "Louisiana",
      abbreviation: "LA",
    },
    {
      name: "Maine",
      abbreviation: "ME",
    },
    {
      name: "Marshall Islands",
      abbreviation: "MH",
    },
    {
      name: "Maryland",
      abbreviation: "MD",
    },
    {
      name: "Massachusetts",
      abbreviation: "MA",
    },
    {
      name: "Michigan",
      abbreviation: "MI",
    },
    {
      name: "Minnesota",
      abbreviation: "MN",
    },
    {
      name: "Mississippi",
      abbreviation: "MS",
    },
    {
      name: "Missouri",
      abbreviation: "MO",
    },
    {
      name: "Montana",
      abbreviation: "MT",
    },
    {
      name: "Nebraska",
      abbreviation: "NE",
    },
    {
      name: "Nevada",
      abbreviation: "NV",
    },
    {
      name: "New Hampshire",
      abbreviation: "NH",
    },
    {
      name: "New Jersey",
      abbreviation: "NJ",
    },
    {
      name: "New Mexico",
      abbreviation: "NM",
    },
    {
      name: "New York",
      abbreviation: "NY",
    },
    {
      name: "North Carolina",
      abbreviation: "NC",
    },
    {
      name: "North Dakota",
      abbreviation: "ND",
    },
    {
      name: "Northern Mariana Islands",
      abbreviation: "MP",
    },
    {
      name: "Ohio",
      abbreviation: "OH",
    },
    {
      name: "Oklahoma",
      abbreviation: "OK",
    },
    {
      name: "Oregon",
      abbreviation: "OR",
    },
    {
      name: "Palau",
      abbreviation: "PW",
    },
    {
      name: "Pennsylvania",
      abbreviation: "PA",
    },
    {
      name: "Puerto Rico",
      abbreviation: "PR",
    },
    {
      name: "Rhode Island",
      abbreviation: "RI",
    },
    {
      name: "South Carolina",
      abbreviation: "SC",
    },
    {
      name: "South Dakota",
      abbreviation: "SD",
    },
    {
      name: "Tennessee",
      abbreviation: "TN",
    },
    {
      name: "Texas",
      abbreviation: "TX",
    },
    {
      name: "Utah",
      abbreviation: "UT",
    },
    {
      name: "Vermont",
      abbreviation: "VT",
    },
    {
      name: "Virgin Islands",
      abbreviation: "VI",
    },
    {
      name: "Virginia",
      abbreviation: "VA",
    },
    {
      name: "Washington",
      abbreviation: "WA",
    },
    {
      name: "West Virginia",
      abbreviation: "WV",
    },
    {
      name: "Wisconsin",
      abbreviation: "WI",
    },
    {
      name: "Wyoming",
      abbreviation: "WY",
    },
  ];

  const handleDeliveryState = (event) => {
    setDeliveryState(event.target.value);
  };

  // Phone Number
  const PhoneNumEx = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [validPhoneNum, setValidPhoneNum] = useState();

  const handlePhoneNum = (event) => {
    setUserPhoneNum(event.target.value);
    if (
      !PhoneNumEx.test(event.target.value) ||
      event.target.value.length != 12
    ) {
      console.log("Invalid Phone Number");
      setValidPhoneNum(false);
    } else {
      console.log("Valid Phone Number");
      setValidPhoneNum(true);
    }
  };

  // Calcuate price of items
  const calcuatePrice = (pretotal) => {
    setPreTax(pretotal);

    // Apply shipping fee if the order is over 50 dollars
    if (pretotal >= 50) {
      setApplyShippingFee(false);
    }

    // 3% sales tax
    let tax = Math.round(0.03 * pretotal * 100) / 100;
    setTax(tax.toFixed(2));

    // setting total price depending on if applying shipping fee
    if (applyShippingFee) {
      setPriceTotal(
        Math.round((pretotal + shippingFee + tax + Number.EPSILON) * 100) / 100
      );
    } else {
      Math.round((pretotal + tax + Number.EPSILON) * 100) / 100;
    }
  };

  const fetchShoppingCartData = async () => {
    let { data: Cart, error } = await supabase
      .from("Cart")
      .select("*")
      .eq("sessionID", localStorage.getItem("sessionID"))
      .order("created_at", { ascending: false });

    if (error == null) {
      setCart(Cart);

      // Calculating price data
      // Pretax price
      let totalPreTax = 0;
      for (let i = 0; i < Cart.length; i++) {
        totalPreTax += Cart[i].price;
      }

      // accurate rounding
      totalPreTax = Math.round((totalPreTax + Number.EPSILON) * 100) / 100;

      calcuatePrice(totalPreTax);
    } else {
      console.error(error);
    }
  };

  // Small component that displays the prife
  const priceDisplay = (price, desc) => {
    return (
      <div className="price-display-container">
        <div>${price}</div>
        <div className="price-display-desc">{desc}</div>
      </div>
    );
  };

  // Order Function
  const [confirmButtonClicked, setConfirmButtonClicked] = useState(false);
  const [canOrder, setCanOrder] = useState();

  const confirmOrder = async () => {
    setConfirmButtonClicked(true);
    if (
      userEmail == "" ||
      firstName == "" ||
      lastName == "" ||
      deliveryStreetAddress == "" ||
      deliveryCity == "" ||
      deliveryCity == "" ||
      deliveryZipCode == "" ||
      userPhoneNum == "" ||
      !validEmail ||
      !validZipCode ||
      !validPhoneNum
    ) {
      setCanOrder(false);
      console.log("Not all fields have been filled out");
    } else {
      const orderData = {
        email: userEmail,
        firstName: firstName,
        lastName: lastName,
        streetAddress: deliveryStreetAddress,
        apartment: deliveryApartment,
        city: deliveryCity,
        state: deliveryState,
        zipCode: deliveryZipCode,
        phoneNumber: userPhoneNum,
      };
      setCanOrder(true);
      console.log(orderData);

      const { data, error } = await supabase
        .from("Orders")
        .select("*")
        .eq("sessionID", localStorage.getItem("sessionID"));

      if (data.length != 0 && data[0].payed == false) {
        const { data: update, error } = await supabase
          .from("Orders")
          .update({
            email: userEmail,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: userPhoneNum,
            itemsData: cart,
            cost: priceTotal,
            paymentInfo: null,
            address: {
              street: deliveryStreetAddress,
              apartment: deliveryApartment,
              city: deliveryCity,
              state: deliveryState,
              zipCode: deliveryZipCode,
            },
            trackingNumber: uuid(),
            payed: false,
            sessionID: localStorage.getItem("sessionID"),
          })
          .eq("id", data[0].id);
        console.log("Updated");
      } else {
        const { data, error } = await supabase
          .from("Orders")
          .insert([
            {
              email: userEmail,
              firstName: firstName,
              lastName: lastName,
              phoneNumber: userPhoneNum,
              itemsData: cart,
              cost: priceTotal,
              paymentInfo: null,
              address: {
                street: deliveryStreetAddress,
                apartment: deliveryApartment,
                city: deliveryCity,
                state: deliveryState,
                zipCode: deliveryZipCode,
              },
              trackingNumber: uuid(),
              payed: false,
              sessionID: localStorage.getItem("sessionID"),
            },
          ])
          .select();
        console.log("Added");
      }
      navigate("/payment");
    }
  };

  // Fetching Order Data
  const fetchOrders = async () => {
    // fetching order data
    const { data, error } = await supabase
      .from("Orders")
      .select("*")
      .eq("sessionID", localStorage.getItem("sessionID"));

    // fetching cart data
    const { data: Cart, error: CartError } = await supabase
      .from("Cart")
      .select("*")
      .eq("sessionID", localStorage.getItem("sessionID"));

    if (CartError) {
      console.error(CartError);
    } else {
      // If there is nothing in the cart, cancel the order
      if (Cart.length == 0 && data[0].payed == false) {
        let { data, error } = await supabase
          .from("Orders")
          .delete()
          .eq("sessionID", localStorage.getItem("sessionID"));
      }
    }

    if (data.length == 0) {
      console.log("No Orders Yet");
    } else {
      // Import the order data that was previously submitted
      setUserEmail(data[0].email);
      setValidEmail(true);
      setFirstName(data[0].firstName);
      setLastName(data[0].lastName);
      setDeliveryStreetAddress(data[0].address.street);
      setDeliveryApartment(data[0].address.apartment);
      setDeliveryCity(data[0].address.city);
      setDeliveryState(data[0].address.state);
      for (let i = 0; i < states.length; i++) {
        if (data[0].address.state == states[i].name) {
          setDefaultStatePos(i);
        }
      }
      setDeliveryZipCode(data[0].address.zipCode);
      setValidZipCode(true);
      setUserPhoneNum(data[0].phoneNumber);
      setValidPhoneNum(true);
    }
  };

  // If the user clicked the continue shopping button
  const handleContinueShopping = () => {
    navigate("/shoppingCategories");
  };

  // Update cart info based on changes to the cart database
  useEffect(() => {
    fetchShoppingCartData();
    fetchOrders();
  }, []);

  return (
    <div className="checkout-page-container">
      {cart != 0 ? (
        <>
          <div className="checkout-cart-list-container">
            <div className="checkout-cart-list-title">Your Cart:</div>
            <div>
              {cart.map((item, index) => (
                <CartCard itemData={item} key={index} />
              ))}
            </div>
          </div>
          <div className="checkout-details-container">
            <div className="order-summary-title">Order Summary</div>
            <div className="order-summary-container">
              <div className="order-summary-total-price">Price Total</div>
              {priceDisplay(preTax, "Subtotal")}
              {priceDisplay(tax, "Tax")}
              {applyShippingFee
                ? priceDisplay(shippingFee, "Shipping")
                : priceDisplay(0, "Shipping")}
              <hr
                style={{
                  marginBottom: "10px",
                }}
              />
              {priceDisplay(priceTotal, "Total")}
              <div className="payment-container">
                <div className="form-section-title">Delivery Information</div>
                <div className="email-form-container">
                  {/* Customer Email */}
                  <label>Email</label>
                  <input
                    type="text"
                    autoComplete="off"
                    className="input-field"
                    placeholder="JohnDoe@example.com..."
                    value={userEmail}
                    onChange={(event) => handleEmail(event)}
                  />
                  {!validEmail && userEmail != "" && (
                    <div className="invalid-email">Not a valid email!</div>
                  )}
                </div>
                <hr
                  style={{
                    marginTop: "30px",
                    marginBottom: "20px",
                  }}
                />
                {/* Address input */}
                <div className="address-form-container">
                  <div className="delivery-form-header">
                    <div className="form-section-text">Delivery Address</div>
                    <div className="form-section-subtext">
                      * Is a requried field
                    </div>
                  </div>
                  <div className="form-names-input-container">
                    <div className="name-input-container">
                      <div>First Name*</div>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="John..."
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </div>
                    <div className="name-input-container">
                      <div>Last Name*</div>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Doe..."
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </div>
                  </div>
                  {/* street address */}
                  <div className="street-input-container">
                    <div>Street Address*</div>
                    <input
                      type="text"
                      className="input-field-address"
                      placeholder="12345 A Street..."
                      value={deliveryStreetAddress}
                      onChange={(event) =>
                        setDeliveryStreetAddress(event.target.value)
                      }
                    />
                  </div>
                  {/* Apartment / Unit input */}
                  <div className="street-input-container">
                    <div>Apartment/Unit</div>
                    <input
                      type="text"
                      className="input-field-address"
                      placeholder="Apt 22/Unit A..."
                      value={deliveryApartment}
                      onChange={(event) =>
                        setDeliveryApartment(event.target.value)
                      }
                    />
                  </div>
                  {/* City and state */}
                  <div className="form-names-input-container">
                    <div className="name-input-container">
                      <div>City*</div>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Chicago..."
                        value={deliveryCity}
                        onChange={(event) =>
                          setDeliveryCity(event.target.value)
                        }
                      />
                    </div>
                    <div className="name-input-container">
                      <div>State*</div>
                      <select
                        className="state-dropdown"
                        defaultValue={states[defaultStatePos].name}
                        onChange={handleDeliveryState}
                      >
                        {states.map((state, index) => (
                          <option value={state.name} key={index}>
                            {state.abbreviation}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* zip code and phone number */}
                  <div className="form-names-input-container">
                    <div className="name-input-container">
                      <div>Zip Code*</div>
                      <input
                        type="text"
                        autoComplete="off"
                        className="input-field"
                        placeholder="12345..."
                        value={deliveryZipCode}
                        onChange={(event) => handleZipCode(event)}
                      />
                      {!validZipCode && deliveryZipCode != "" && (
                        <div className="invalid-email">
                          Not a valid zip code!
                        </div>
                      )}
                    </div>
                    <div className="name-input-container">
                      <div>Phone Number*</div>
                      <input
                        type="text"
                        className="input-field"
                        value={userPhoneNum}
                        onChange={(event) => handlePhoneNum(event)}
                        placeholder="123-456-7890"
                      />
                      <div className="invalid-email">
                        {!validPhoneNum &&
                          userPhoneNum != "" &&
                          "Not a valid phone number"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Confirm Order Button */}
              <div className="confirm-container">
                <button onClick={confirmOrder} className="confirm-order-button">
                  Checkout
                </button>
                {!canOrder && confirmButtonClicked && (
                  <div className="fields-not-filled-error">
                    Not all fields have been filled out or field errors!
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="empty-cart-container">
          <div className="empty-cart-title">No items in Cart</div>
          <div className="empty-cart-subtext">Fill that cart up!</div>
          <button
            className="continue-shopping-button"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CartCheckout;
