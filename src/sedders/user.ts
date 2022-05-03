const { faker } = require("@faker-js/faker");

export const seedUser = Array.from({ length: 20 }).map(() => ({
  name: faker.name.firstName() + " " + faker.name.lastName(),
  mail: faker.internet.email(),
  picture: faker.image.avatar(),
}));



