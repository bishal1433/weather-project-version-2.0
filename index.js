const express=require(`express`);
const bodyParser=require(`body-parser`);
const https=require(`https`);

const app=express();

//use bodyparser module....
app.use(bodyParser.urlencoded({extended:true}));
//use public folder as static folder
app.use(express.static("public"));


//when click on check button...
app.get(`/`,function(req,res){
      res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var city=req.body.city;
  var country=req.body.country;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=ed10325a71f45096f002bb8d86c0a083&units=metric";

  //getting data through api.....
  https.get(url,function(response){
    response.on(`data`,function(data){




        const myApi=JSON.parse(data);
        const temp=myApi.main.temp;
        const disc=myApi.weather[0].description;
        const feels=myApi.main.feels_like;

// console.log(temp);
// console.log(disc);
// console.log(feels);
// htmlpart
      const html=`
      <!DOCTYPE html>
      <html lang="en">

      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>weather condition</title>
        <!-- style part -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <style media="screen">
          @import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');

          html,
          body {
            height: 100%
          }

          * {
            padding: 0px;
            margin: 0px
          }

          body {
          background-color:#867ae9;
            display: grid;
            place-items: center
          }

          .card {
            border-radius: 15px;
            color: #6f707d
          }

          .div1 {
            background: url('https://i.imgur.com/sTfvzrM.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            background-attachment: local;
            border-radius: 16px 16px 0 0
          }

          .div2 {
            height: 30px;
            background-color: #9fe0fa;
            border-radius: 0 0 15px 15px
          }

          h1 {
            font-size: 65px
          }

          sup {
            font-size: 17px;
            position: relative;
            top: -2rem
          }

          *:focus {
            outline: none
          }
        </style>
        <!-- style ends here -->
      </head>

      <body>
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12 col-md-5 col-sm-12 col-xs-12">
              <div class="card text-white">
                <div class="div1 p-4 p-md-5 ">
                  <h5>`+city+`,`+country+`</h5>
                  <h1>`+temp+`<sup>°C </sup> </h1>
                  <p class="my-0">Feels like `+feels+`</p>
                  <h4 class="my-0">Mostly clear`+disc+`</h4>
                </div>
                <div class="div2">
                 </div>

              </div>
            </div>
          </div>
        </div>

        <!-- script part -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

      </body>

      </html>

      `;

      // html ends here
        res.send(html);
    });

  });
});


//creating our new server...
app.listen(process.env.PORT||3000,function(){
  console.log("your server is up at port 3000.");
});
