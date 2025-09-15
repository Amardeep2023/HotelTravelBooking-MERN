const express =require('express');
const cors = require('cors');
const User=require('./models/user.js')
const place=require('./models/places.js')
const bookings=require('./models/bookings.js')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const cookieParser=require('cookie-parser');
const imageDownloader=require('image-downloader');
const fs=require('fs');
const multer =require('multer');
const { genSalt } = require('bcrypt');
const app =express();
const port = process.env.PORT || 4000

const bcryptSalt=bcrypt.genSaltSync(10);
const jwtsecret='amardeep';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));

const allowedOrigins = [
  'https://hotel-travel-booking.vercel.app/',
                                       // Production frontend
  'http://localhost:5173'              // Local development (Vite/React)
];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Enable cookies/auth headers
  allowedHeaders: ['Content-Type', 'Authorization']
}));

mongoose.connect(process.env.MONGO_URL);

function getUserDataToken(req){
  return new Promise((resolve,reject)=>{
    jwt.verify(req.cookies.token, jwtsecret, {}, async (err, userData)=>{
      if(err) throw err;
      
      resolve(userData);
    })
  })
 
}




app.post('/api/register',async (req,res)=>{
    
    
    const {name,email,password}= req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,bcryptSalt)
        })
        res.json(userDoc);
        
    } catch (e) {
        res.status(422).json(e)
    }
   
})

app.post('/api/login', async(req,res)=>{
   
   const {email,password} =req.body;
    const userDoc= await User.findOne({email});
    if(userDoc){
        const passok=bcrypt.compareSync(password,userDoc.password);
        if(passok){
            jwt.sign({email:userDoc.email,id:userDoc._id,name:userDoc.name},jwtsecret,{},(err,token)=>{
                if (err)throw err;
                res.cookie('token',token).json(userDoc)

            })
           
        }
        else{
            res.status(422).json('pass not ok')
        }

       
    }
    else{
        res.json('not found')
    }

})

app.get('/api/profile', (req,res) => {
   
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtsecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    } else {
      res.json(null);
    }
  });

  app.post('/api/logout',(req,res)=>{
    res.cookie('token','').json(true);
  });

  
  
  app.post('/api/upload-by-link', async (req,res)=>{
    const {link}=req.body;
    const NewName='photo'+Date.now()+'.jpg';
    await imageDownloader.image({
        url:link,
        dest:__dirname+'/uploads/'+ NewName
    });
    res.json( NewName)
  })

  const photoMiddleware=multer({dest:'uploads/'})
  app.post('/upload',photoMiddleware.array('photos',100),(req,res)=>{
    const uploadFiles=[];
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i];
        const parts=originalname.split('.');
        const ext=parts[parts.length-1];
        const newPath=path + '.' + ext;
        fs.renameSync(path,newPath);
        uploadFiles.push(newPath.replace('uploads',''));
    }
    res.json(uploadFiles)
  })

  app.post('/api/places',(req,res)=>{
    const {token} = req.cookies;
    const {
        title,address,addedphotos,description,perks,extraInfo,
      checkIn,checkOut,maxGuest,price,
    }=req.body;
    jwt.verify(token, jwtsecret, {}, async (err, userData)=>{
        if (err) throw err;
      const PlaceDoc =  await place.create({
            owner:userData.id,title,address,addedphotos,description,perks,extraInfo,
            checkIn,checkOut,maxGuest,price,
        });
        res.json(PlaceDoc)
    })
  })

app.get('/api/user-places',(req,res)=>{
    const {token} = req.cookies;
    jwt.verify(token, jwtsecret, {}, async (err, userData)=>{
        const {id}=userData;
        res.json(await place.find({owner:id}));
    })
})
app.get('/api/places/:id',async (req,res)=>{
  const {id}=req.params;
  res.json(await place.findById(id))

})

app.put('/api/places',async (req,res)=>{
  const {token} = req.cookies;
  const {id, title,address,addedphotos,description,perks,extraInfo,
    checkIn,checkOut,maxGuest,price}=req.body;
    jwt.verify(token, jwtsecret, {}, async (err, userData)=>{

      if(err) throw err;
      const PlaceDoc=await place.findById(id);
      if(userData.id===PlaceDoc.owner.toString()){
        PlaceDoc.set({
          title,address,addedphotos,description,perks,extraInfo,
          checkIn,checkOut,maxGuest,price
        });
        await PlaceDoc.save();
        res.json('ok');
      }
    })


})

app.get('/api/places',async (req,res)=>{
  res.json(await place.find());
})

app.post('/api/bookings', async (req,res)=>{
  const userData= await getUserDataToken(req);
  const {name,phone,checkIn,checkOut,place,maxGuest,price,}=req.body;
  bookings.create({
    name,phone,checkIn,checkOut,place,maxGuest,price,user:userData.id
  }).then((doc)=>{
    
    res.json(doc);
  }).catch((err)=>{
    throw err;
  })
})



app.get('/api/bookings',async (req,res)=>{
  const userData= await getUserDataToken(req);
  res.json(await bookings.find({user:userData.id}).populate('place'))
})



app.get('/test',(req,res)=>{
    res.json('Hi there')
})

app.listen(port,()=>{
    console.log('hi')
});
