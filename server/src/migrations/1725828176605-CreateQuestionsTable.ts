import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateQuestionsTable1725828176605 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE questions (
                id SERIAL PRIMARY KEY,
                question VARCHAR(255) NOT NULL,
                answer VARCHAR(255) NOT NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE questions`);
    }

}
