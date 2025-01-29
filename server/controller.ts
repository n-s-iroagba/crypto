import { Request, Response } from 'express';
import { AccountHolder } from './model';  



export const loginByWalletAddress = async (req: Request, res: Response):Promise<any> => {
  const { walletAddress } = req.body;

  try {
    const accountHolder = await AccountHolder.findOne({
      where: { walletAddress },
    });

  
    if (!accountHolder) {
        throw new Error('Account holder not found')
       }

    return res.status(200).json(accountHolder);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const fetchAccountHolder = async (req: Request, res: Response):Promise<any> => {


  try {
    const accountHolder = await AccountHolder.findOne();

  
    if (!accountHolder) {
        throw new Error('Account holder not found')
       }

    return res.status(200).json(accountHolder);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};


export const updateWithdrawal = async (req: Request, res: Response):Promise<any> =>{
  const {  newWithdrawalAmount } = req.body;

  try {

    const accountHolder = await AccountHolder.findOne();

    if (!accountHolder) {
     throw new Error('Account holder not found')
    }

  
    accountHolder.status = 'pending';
    accountHolder.requestedWithdrawalAmount = newWithdrawalAmount;

    await accountHolder.save();

    return res.status(200).json({
      message: 'Account holder status updated and withdrawal amount set',
      accountHolder,
    });
  } catch (error:any) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
