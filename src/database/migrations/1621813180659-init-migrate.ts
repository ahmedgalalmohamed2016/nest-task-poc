import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigrate1621813180659 implements MigrationInterface {
    name = 'initMigrate1621813180659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" ADD CONSTRAINT "FK_8da8fe5ac4c8d0731120637d7cf" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "collection" DROP CONSTRAINT "FK_8da8fe5ac4c8d0731120637d7cf"`);
    }

}
