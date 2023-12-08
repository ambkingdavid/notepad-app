

class IndexController {
  static async homepage(req, res) {
    const locals = {
      title: 'NotePad App',
      description: 'A NotePad Application',
    }

    res.render('index', {
      locals,
      layout: '../views/layouts/homepage',
    })
  }

  static async about(req, res) {
    const locals = {
      title: 'About NotePad App',
      description: 'A NotePad Application',
    }

    res.render('about', {
      locals,
      layout: '../views/layouts/homepage'
    });
  }
}





export default IndexController;
