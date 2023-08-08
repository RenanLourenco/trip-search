import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1691447967874 implements MigrationInterface {
    name = 'Migrations1691447967874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destinations" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "destinations" DROP COLUMN "photo"`);
        await queryRunner.query(`ALTER TABLE "destinations" ADD "photo_one" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "destinations" ADD "photo_two" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "destinations" ADD "meta" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "destinations" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "destinations" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "destinations" DROP COLUMN "meta"`);
        await queryRunner.query(`ALTER TABLE "destinations" DROP COLUMN "photo_two"`);
        await queryRunner.query(`ALTER TABLE "destinations" DROP COLUMN "photo_one"`);
        await queryRunner.query(`ALTER TABLE "destinations" ADD "photo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "destinations" ADD "price" integer NOT NULL`);
    }

}
