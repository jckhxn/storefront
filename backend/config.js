import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://jack:112358@storefront.g0cel.mongodb.net/storefront?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'AXj_EpQRv_1Vl5Uqrw_Aofe_OHXwAhU43qg2h3oVZWh8s1bQmftYu_V5-VQOnkQ63CGDh173zsEC9D5V',
  accessKeyId: process.env.accessKeyId || 'AKIAJKJFZYJJROJ75TAQ',
  secretAccessKey: process.env.secretAccessKey || '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',
};
