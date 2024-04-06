import { DataSource } from 'typeorm';
import * as migrations from '../../../../migrations';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 3306,
  username: 'user_api',
  password: 'user_api',
  database: 'user_api',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations,
});

export default dataSource;
