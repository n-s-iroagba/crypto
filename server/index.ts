import bodyParser from "body-parser";
import express from 'express';
import { fetchAccountHolder, loginByWalletAddress, updateWithdrawal } from "./controller";
import { AccountHolder, sequelize } from "./model";
import cors from 'cors'

const app = express();

const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: 'http://localhost:3000' // or the URL of your React app
}));

app.use(bodyParser.json());
app.get('/', async (req, res):Promise<any> =>{
  try{
   const accountholder = await  AccountHolder.create({
        name: 'Ovshany Ron',
        withdrawalAmount: 50,
        depositAmount: 50000,
        fee: 5,
        status: 'none',
        walletAddress: '0x99F81Ed2d60E02f8cFc90844585c4E9D607239F6',
        requestedWithdrawalAmount: 0,
    })
    res.send(accountholder)
  }catch(error:any){
 return res.status(500).json({error:error})
}
})
app.get('/account-holder',fetchAccountHolder)
app.post('/login', loginByWalletAddress);
app.post('/update-withdrawal', updateWithdrawal);


sequelize.sync({
    // force:true
  }).then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })