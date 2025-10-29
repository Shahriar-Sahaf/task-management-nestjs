import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTasksTable20251029120000 implements MigrationInterface {
  name = 'CreateTasksTable20251029120000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."tasks_status_enum" AS ENUM('OPEN','IN_PROGRESS','DONE','DELETED')`,
    );
    await queryRunner.query(`CREATE TABLE "tasks" (
            "id" uuid DEFAULT uuid_generate_v4(),
            "name" varchar(255) NOT NULL,
            "description" varchar(255) NOT NULL,
            "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'OPEN',
            CONSTRAINT "PK_tasks_id" PRIMARY KEY ("id")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tasks"`);
    await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
  }
}
