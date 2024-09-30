const User = require('./User');
const BlogPost = require('./BlogPost');
const Commentary = require('./Commentary');

User.hasMany(BlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

BlogPost.hasMany(Commentary, {
  foreignKey: 'blogPost_id',
  onDelete: 'CASCADE'
});

Commentary.belongsTo(User, {
  foreignKey: 'user_id'
});

Commentary.belongsTo(BlogPost, {
  foreignKey: 'blogPost_id'
});

module.exports = { User, BlogPost, Commentary };
