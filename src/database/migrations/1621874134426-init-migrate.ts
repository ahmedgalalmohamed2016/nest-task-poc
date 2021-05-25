import {MigrationInterface, QueryRunner} from "typeorm";

export class initMigrate1621874134426 implements MigrationInterface {
    name = 'initMigrate1621874134426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_05ada5992dbbc46f84f44cf3ce6"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME COLUMN "ownerId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_3e02d32dd4707c91433de0390ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_3e02d32dd4707c91433de0390ea"`);
        await queryRunner.query(`ALTER TABLE "role" RENAME COLUMN "userId" TO "ownerId"`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_05ada5992dbbc46f84f44cf3ce6" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
