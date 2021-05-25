import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigrate1621813625378 implements MigrationInterface {
    name = 'initMigrate1621813625378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_8da8fe5ac4c8d0731120637d7cf"`);
        await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "groupId"`);
        await queryRunner.query(`ALTER TABLE "group" ADD "collectionIds" text array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "group" DROP COLUMN "collectionIds"`);
        await queryRunner.query(`ALTER TABLE "collection" ADD "groupId" uuid`);
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_8da8fe5ac4c8d0731120637d7cf" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
