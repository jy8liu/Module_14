const router = require('express').Router();
const { Commentary } = require('../../models');
const withAuth = require('../../utils/auth');

// Creating comments logic
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Commentary.create({
      text: req.body.text,
      blogPost_id: parseInt(req.body.blogPost_id),
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// Deleting comments logic
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Commentary.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No comments found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
