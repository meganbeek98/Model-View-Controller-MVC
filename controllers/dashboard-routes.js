router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id', 
        'post_text', 
        'title', 
        'created_at',
        
      ],
      include: [
     
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
         
          model: User,
          attributes: ['username']
        }
      ]
     })
     .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      
      const posts = dbPostData.get({ plain: true });
  
      res.render('edit-post', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  
  
  
  
  
  
  
  module.exports = router;