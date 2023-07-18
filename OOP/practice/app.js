function thisPractice(firstName, lastName, dob) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthday = new Date(dob);
}
// instead of crowding the object here- function, we can extract calculateAge function into prototypes. This can help serve like a global scope storage box for both john and brad in this regard
// calculate age from birthday
thisPractice.prototype.calculateAge = function () {
  const diff = Date.now() - this.birthday.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
// get full name
thisPractice.prototype.fullName = function () {
  return `${this.firstName} ${this.lastName}`;
};
// gets married
thisPractice.prototype.getsMarried = function (newLastName) {
  this.lastName = newLastName;
};
// change lastname if one gets married
const brad = new thisPractice("Brad", "Johnson", "06/11/1973");
const Esther = new thisPractice("Esther", "Hanson", "July 17 2000");
console.log(Esther.calculateAge());
console.log(Esther.fullName());
// sets the value of the new last name as she is married
Esther.getsMarried("Smith");
console.log(Esther.fullName());
// this is an object prototype that checks 'thisPractice' if esther
console.log(Esther.hasOwnProperty("firstName"));
// check console for more object.prototypes
console.log(Esther);

// PROTOTYPE INHERITANCE USING A PERSON AND A CUSTOMER INFO RELATIONSHIP
// personal info
function personal(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}
personal.prototype.personalInfo = function () {
  return `Hello Mr. ${this.firstName} ${this.lastName}. Good to see you.`;
};
const Wissy = new personal("Wisdom", "Johnson");
console.log(Wissy.personalInfo());
// customer info
function customer(firstName, lastName, phoneNumber, membershipPlans) {
  // this code below extracts / inherits the parameters in personal function above into the customer function
  personal.call(this, firstName, lastName);
  this.phoneNumber = phoneNumber;
  this.membershipPlans = membershipPlans;
}
// this helps the customer to inherit the personal prototypes making me able to use the personalInfo function below
customer.prototype = Object.create(personal.prototype);
// make customer.prototype return customer() in console
customer.prototype.constructor = customer;
customer.prototype.customerInfo = function () {
  return `Hello Mr. ${this.firstName} ${this.lastName}. You have registered for ${this.membershipPlans} membership. Welcome to our company.`;
};
const customer1 = new customer(
  "Wisdom",
  "Johnson",
  "+(234)-900-000-0000",
  "Basic"
);
console.log(customer1);
console.log(customer1.customerInfo());
//  using object create- first method
const personalPrototypes = {
  greeting: function () {
    return `Hello ${this.firstName} ${this.lastName}. How are you?`;
  },
  getsMarried: function (newLastName) {
    this.lastName = newLastName;
  },
};
const Kamsy = Object.create(personalPrototypes);
Kamsy.firstName = "Kamsy";
Kamsy.lastName = "Johnson";
// before getting married
console.log(Kamsy.greeting());
Kamsy.getsMarried("Richard");
// after getting married
console.log(Kamsy.greeting());
//  using object create- first method
const WissyJ = Object.create(personalPrototypes, {
  firstName: { value: "Wisdom" },
  lastName: { value: "Johnson" },
  age: { value: 18 },
});
console.log(WissyJ);
// using ES6 classes
class Person {
  constructor(firstName, lastName, dob) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = new Date(dob);
  }
  calculateAge() {
    const diff = Date.now() - this.birthday.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  getsBaptized(newFirstName) {
    this.firstName = newFirstName;
  }
}

const Mary = new Person("Mary", "Johnson", "09/03/2000");
Mary.getsBaptized("Richard");
// works just like the examples above
console.log(Mary.calculateAge());
console.log(Mary);
// extend the Person class  into the customer class. This means that the customer class will inherit the content of the person class and even have extra content
class Custom extends Person {
  constructor(firstName, lastName, dob, phoneNumber, membershipPlan) {
    // super function brings in the content of the person class. If super()is deleted, you will see the parameters- firstName, lastName, dob in customer class are faded indicating the absense of those parameters
    super(firstName, lastName, dob);
    this.phoneNumber = phoneNumber;
    this.membershipPlan = membershipPlan;
  }
  getMembershipPlanCost() {
    return 15000;
  }
}
const customerA = new Custom(
  "Wissy",
  "Johnson",
  "09/03/2005",
  "+(234)-900-000-0000",
  "Basic"
);
console.log(customerA);
const number = document.querySelector("#number");
console.log(customerA.getMembershipPlanCost());
number.value = customerA.getMembershipPlanCost();
