module.exports = {
  authMiddleware: require("./checks/user/auth.check.middleware"),
  userMiddleware: require("./checks/user/user.check.middleware"),
  documentTypeMiddleware: require("./checks/document-type.check.middleware"),
  sharedMiddleware: require("./checks/shared.check.middleware"),
  indicativeNumberMiddleware: require("./checks/indicative-number.check.middleware"),
  departmentMiddleware: require("./checks/department.check.middleware"),
  municipalityMiddleware: require("./checks/municipality.check.middleware"),
  paymentMethodMiddleware: require("./checks/payment-method.check.middleware"),
  unitMeasureMiddleware: require("./checks/unit-measure.check.middleware"),
  shippingTypeMiddleware: require("./checks/shipping-type.check.middleware"),
  vehicleMiddleware: require("./checks/vehicle.check.middleware"),
  adminMiddleware: require("./checks/user/admin.check.middleware"),
  clientMiddleware: require("./checks/user/client.check.middleware"),
  driverMiddleware: require("./checks/user/driver.check.middleware"),
  coordinatorMiddleware: require("./checks/user/coordinator.check.middleware"),
  functionalityMiddleware: require("./checks/functionality.check.middleware"),
  travelMiddleware: require("./checks/travel.check.middleware"),
  sellerMiddleware: require("./checks/user/seller.check.middleware"),
  roleMiddleware: require("./checks/role.check.middleware"),
  routeMiddleware: require("./checks/route.check.middleware"),
  seatMiddleware: require("./checks/seat.check.middleware"),
  invoiceMiddleware: require("./checks/invoice.check.middleware"),
  observationMiddleware: require("./checks/observation.check.middleware"),
  resolutionMiddleware: require("./checks/resolution.check.middleware"),
  ownerMiddleware: require("./checks/user/owner.check.middleware")
};
