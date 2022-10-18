const imagesCategory = require('../../models/slike')
const wedStories = require('../../models/weddStories')


module.exports = {

    //index page and categorys

    async index(req, res){
        let q = "naslovna"
        if(req.query){
        if(req.query.query == 'travel') q = "travel"
        if(req.query.query == 'children') q = "children"
        if(req.query.query == 'social') q = "social"
        if(req.query.query == 'social') q = "social"
        if(req.query.query == 'birthdays') q = "birthdays"
        }
      
        console.log(req.query)
        console.log(q)
        const posts = await imagesCategory.find({category: q}).sort({"createdAt":-1})
        res.render('index', {slike: posts , q : q})
    },

    //contact page

    async contact(req, res){
        res.render('contact', {q: "contact"})
    }
    ,
    //wedding stories page

    async wedStories(req, res){
        let wed = await wedStories.find().sort({"createdAt":-1})
        res.render('wedStori',{q:"wedd-stories", wedStories: wed})
    },

     //wedding stories page SINGLE GALLERY

     async wedStoriesSingle(req, res){
      let wed = await wedStories.findOne({_id : req.params.id})
      res.render('wedSingleGallery',{q:wed.name, content: wed})
  },

    //send email via contact form

    async sendEmail(req, res){
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'anaigorwed@gmail.com',
              pass:'adknbqhbcfdyghvq'
            }
          });
        
        let mailOptions = {
            from: 'NOVA PORUKA - ANA&IGOR',
            to: 'ninkovicana05@gmail.com',
            subject: `ANA&IGOR web - NOVA PORUKA! `,
            html: `<strong>Ime : </strong> ${req.body.fname} <br>
            <strong>Prezime : </strong> ${req.body.lname} <br>
            <strong>Email : </strong> ${req.body.email} <br>
            <strong>Poruka : </strong> ${req.body.message} <br>`
          };
        
        
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              res.redirect('/contact')
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              res.redirect('/contact')
              
              
            }
          });
    }

}