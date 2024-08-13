import { Environment } from "./environment.interface";

export const environment: Environment = {
  APP_NAME: 'digicure',
  BASE_URL: 'http://localhost:4200',
  // BASE_URL: 'https://newdesign.isws.co.in',
  API_URL: 'https://ceramicapi.isws.co.in',
  // API_URL:"http://127.0.0.1:3000"
  // API_URL: "http://13.235.87.96"
};
// aws s3 cp C:\Users\Admin\Desktop\ceramic-frontend\dist\ceramic-frontend s3://ceramic.isws.co.in --recursive 