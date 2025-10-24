var app = angular.module("restaurantApp", []);

app.controller("BookingController", function ($scope) {

  // Initial Data
  $scope.tables = [
    { name: "Table 1", seats: 2, booked: false },
    { name: "Table 2", seats: 4, booked: false },
    { name: "Table 3", seats: 6, booked: false },
    { name: "Table 4", seats: 2, booked: false },
    { name: "Table 5", seats: 4, booked: false },
  ];

  $scope.bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  // Book a Table
  $scope.bookTable = function () {
    var availableTable = $scope.tables.find(
      (t) => t.seats >= $scope.booking.seats && !t.booked
    );

    if (!availableTable) {
      $scope.message = "❌ No available tables for selected seats!";
      return;
    }

    availableTable.booked = true;

    var newBooking = {
      name: $scope.booking.name,
      email: $scope.booking.email,
      date: $scope.booking.date,
      time: $scope.booking.time,
      seats: $scope.booking.seats,
      table: availableTable.name,
    };

    $scope.bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify($scope.bookings));
    $scope.message = "✅ Table " + availableTable.name + " booked successfully!";
    $scope.booking = {}; // reset form
  };
});



