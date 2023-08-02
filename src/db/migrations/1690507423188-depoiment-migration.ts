import { MigrationInterface, QueryRunner } from "typeorm";

export class DepoimentMigration1690507423188 implements MigrationInterface {
    name = 'DepoimentMigration1690507423188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "depoiments" ("id" SERIAL NOT NULL, "photo" character varying NOT NULL, "user" character varying NOT NULL, CONSTRAINT "PK_1386925cd87402a153035db81c6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "depoiments"`);
    }

}
