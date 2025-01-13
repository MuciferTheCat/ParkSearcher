const { buildSchema } = require("graphql");

module.exports = buildSchema(`
  type Parking {
    id: ID!
    parkplaceID: String
    carRegistration: String
    startTime: String
    endTime: String
    isActive: Boolean
  }

  type Query {
    getParking(id: ID!): Parking
    getAllParkings: [Parking]
  }
`);