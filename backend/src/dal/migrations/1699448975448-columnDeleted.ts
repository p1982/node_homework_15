import { MigrationInterface, QueryRunner, TableColumn  } from "typeorm"

export class ColumnDeleted1699448975448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "news_post" RENAME COLUMN "title" TO "header"`,
        );
        await queryRunner.query(
            `CREATE INDEX CONCURRENTLY news_post_title_idx ON news_post(header)`
        );
        await queryRunner.query(
            `CREATE INDEX CONCURRENTLY user_email_idx ON user(email)`
        );
        await queryRunner.addColumn('news_post', new TableColumn({
            name: 'deleted',
            type: 'boolean', // Replace with the actual data type
            isNullable: true,
            default: false
          }));
          await queryRunner.addColumn('user', new TableColumn({
            name: 'deleted',
            type: 'boolean', // Replace with the actual data type
            isNullable: true,
            default: false
          }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "news_post" RENAME COLUMN "title" TO "header"`,
        );
        await queryRunner.query(
            `DROP INDEX CONCURRENTLY news_post_title_idx`
        )
        await queryRunner.query(
            `DROP INDEX CONCURRENTLY user_email_idx`
        )
        await queryRunner.dropColumn('news_post', 'deleted');
        await queryRunner.dropColumn('user', 'deleted');
    }
    

}
