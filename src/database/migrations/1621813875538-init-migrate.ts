import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigrate1621813875538 implements MigrationInterface {
    name = 'initMigrate1621813875538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "collectionIds" SET DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" ALTER COLUMN "collectionIds" DROP DEFAULT`);
    }

}
