import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigrate1621814128664 implements MigrationInterface {
    name = 'initMigrate1621814128664'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "collectionIds"`);
        await queryRunner.query(`ALTER TABLE "group" ADD "collectionIds" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "collectionIds"`);
        await queryRunner.query(`ALTER TABLE "group" ADD "collectionIds" text array NOT NULL DEFAULT '{}'`);
    }

}
