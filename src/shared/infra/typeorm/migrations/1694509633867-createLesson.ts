import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateLesson1694509633867 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'lesson',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'numberQuestions',
            type: 'int',
          },
          {
            name: 'progress',
            type: 'decimal',
            precision: 10,
            scale: 2,
            default: 0.0,
          },
          {
            name: 'unitId',
            type: 'uuid',
            isNullable: true,
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
      'lesson',
      new TableForeignKey({
        name: 'lessonUnit',
        columnNames: ['unitId'],
        referencedTableName: 'unit',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('lesson', 'lessonUnit');
    await queryRunner.dropTable('lesson');
  }
}
