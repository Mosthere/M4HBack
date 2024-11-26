import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthAdmin1732573205645 implements MigrationInterface {
    name = 'AuthAdmin1732573205645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_administrador_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "administrador" "public"."users_administrador_enum" NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "administrador"`);
        await queryRunner.query(`DROP TYPE "public"."users_administrador_enum"`);
    }

}
