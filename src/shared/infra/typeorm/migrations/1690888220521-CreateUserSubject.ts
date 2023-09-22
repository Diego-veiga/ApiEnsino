import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateUserSubject1690888220521 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'userSubjects',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'subjectId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'grade',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0.0,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'create_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'update_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'userSubjects',
      new TableForeignKey({
        name: 'userSubjectUser',
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
    await queryRunner.createForeignKey(
      'userSubjects',
      new TableForeignKey({
        name: 'userSubjectSubject',
        columnNames: ['subjectId'],
        referencedTableName: 'subject',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('userSubjects', 'userSubjectUser');
    await queryRunner.dropForeignKey('userSubjects', 'userSubjectSubject');
    await queryRunner.dropTable('userSubjects');
  }
}
