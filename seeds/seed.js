const sequelize = require('../config/connection');
const { User, BlogPost, Commentary } = require('../models');

const commentaryData = require('./commentaryData.json');
const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blogPost of blogPostData) {
    await BlogPost.create({
      ...blogPost,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const commentary of commentaryData) {
    await Commentary.create({
      ...commentary,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blogPost_id: users[Math.floor(Math.random() * users.length)].id
    });
  }

  process.exit(0);
};

seedDatabase();
