import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';
const tableName = 'addresses';
const database = process.env.DB_NAME;
export class AddressMigration1712669227612 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        database,
        name: tableName,
        columns: [
          new TableColumn({
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          }),
          new TableColumn({ name: 'address', type: 'varchar' }),
          new TableColumn({ name: 'cep', type: 'varchar' }),
          new TableColumn({ name: 'number', type: 'varchar' }),
          new TableColumn({ name: 'district', type: 'varchar' }),
          new TableColumn({ name: 'state', type: 'char', length: '2' }),
          new TableColumn({ name: 'city', type: 'varchar' }),
          new TableColumn({ name: 'complement', type: 'varchar' }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(new Table({ database, name: tableName }));
  }
}
