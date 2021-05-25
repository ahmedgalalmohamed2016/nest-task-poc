import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigrate1621809814288 implements MigrationInterface {
    name = 'initMigrate1621809814288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" ADD "role" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "role"`);
    }

}
