const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

//Connceting to the server
const pool = new Pool({
  user: "vagrant",
  password: "password",
  host: "localhost",
  database: "lightbnb",
});

const getAllProperties = function (options, limit = 10) {
  
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  //if owner is passed
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += ` AND owner_id = $${queryParams.length}`;
  }

  //passing minimum price
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`*100);
    queryString += ` AND cost_per_night >= $${queryParams.length}`;
  }

  //passing maximum price
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`*100);
    queryString += ` AND cost_per_night <= $${queryParams.length}`;
  }

  //passing the rating
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += ` AND rating >= $${queryParams.length}`;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);

};

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(
      `
  SELECT * 
  FROM users 
  where email = $1;`,
      [email]
    )
    .then((res) => {
      console.log(res.rows);
      if (res.rows[0]) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log("The error is:", err);
    });
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool.query(
      `
  SELECT *
  FROM users
  WHERE id = $1;`,
      [id]
    )
    .then((res) => {
      if (res.rows[0]) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log("The error is:", err);
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool.query(
      `INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`,
      [user.name, user.email, user.password]
    )
    .then(res => {
      console.log("success");
    })
    .catch((err) => {
      console.log("The error is:", err);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`SELECT * 
  FROM properties
  JOIN reservations
  ON properties.id = reservations.property_id
  WHERE guest_id = $1
  LIMIT $2;`, [guest_id, limit])
  .then(res => res.rows);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
