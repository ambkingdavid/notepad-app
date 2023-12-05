

class IndexController {
  static async homepage(req, res) {
    const locals = {
      title: 'NotePad App',
      description: 'A NotePad Application',
    }

    res.render('index', locals)
  }

  static async about(req, res) {
    const locals = {
      title: 'About NotePad App',
      description: 'A NotePad Application',
    }

    res.render('about', locals);
  }
}





export default IndexController;