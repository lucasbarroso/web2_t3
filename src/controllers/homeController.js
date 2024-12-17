export const getHomePage = (req, res) => {
    const user = req.session.userId ? { email: req.session.userEmail } : null;
    res.render('home', { user });
  };
  