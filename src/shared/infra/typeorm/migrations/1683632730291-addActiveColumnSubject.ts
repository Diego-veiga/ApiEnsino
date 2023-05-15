import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddActiveColumnSubject1683632730291 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'subject',
      new TableColumn({
        name: 'active',
        type: 'boolean',
        default: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('subject', 'active');
  }
}
