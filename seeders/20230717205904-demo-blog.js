"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Adam",
          email: "johnadam@gmail.com",
          password: await bcrypt.hash("password", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bill Smith",
          email: "billsmith@yahoo.com",
          password: await bcrypt.hash("password", 10),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const users = await queryInterface.sequelize.query(`SELECT id FROM users`);

    const userId = users[0][0].id;

    await queryInterface.bulkInsert(
      "posts",
      [
        {
          title: "Learn React",
          content: "Make sure to watch videos on React and you will learn it easily",
          UserId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Practicing HTML",
          content:
            "After learing the basics of HTML, make sure to pracitce daily until you eventually get the hang of it",
          UserId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const posts = await queryInterface.sequelize.query(`SELECT id FROM posts`);

    const postId = posts[0][0].id;

    const trollId = users[0][1].id;

    await queryInterface.bulkInsert("comments", [
      {
        content: "Thank you for the input",
        UserId: trollId,
        PostId: postId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("comments", null, {});
    await queryInterface.bulkDelete("posts", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};