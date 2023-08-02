import { MigrationInterface, QueryRunner } from "typeorm";

export class DestinationMigration1691013910140 implements MigrationInterface {
    name = 'DestinationMigration1691013910140'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "destinations" ("id" SERIAL NOT NULL, "photo" character varying NOT NULL, "price" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_69c5e8db964dcb83d3a0640f3c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "destinations"`);
    }

}
