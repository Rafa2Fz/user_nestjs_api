import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';
const tableName = 'user';
const database = process.env.DB_NAME;
console.log(database);
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  AGENDER = 'agender',
  NON_BINARIE = 'non_binarie',
  OTHER = 'other',
}

export enum MARITAL_STATUS {
  MARRIED = 'married',
  SINGLE = 'single',
  DIVORCED = 'divorced',
  SEPARETE = 'separate',
  WIDOWER = 'widower',
}

export class UserMigration1712414672658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        database,
        name: tableName,
        columns: [
          new TableColumn({ name: 'id', type: 'uuid', isPrimary: true }),
          new TableColumn({ name: 'name', type: 'varchar' }),
          new TableColumn({
            name: 'gender',
            type: 'enum',
            enum: ['male', 'female', 'agender', 'non_binarie', 'other'],
          }),
          new TableColumn({
            name: 'date_of_birthday',
            type: 'date',
            isNullable: false,
          }),
          new TableColumn({
            name: 'marital_status',
            type: 'enum',
            enum: ['married', 'single', 'divorced', 'separate', 'widower'],
            isNullable: false,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(new Table({ database, name: tableName }));
  }
}
