import {MigrationInterface, QueryRunner} from "typeorm";

export class secondMigration1635717938641 implements MigrationInterface {
    name = 'secondMigration1635717938641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`lastname\` varchar(255) NULL, \`status\` varchar(8) NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`description\` text NOT NULL, \`status\` varchar(8) NOT NULL DEFAULT 'ACTIVE', \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_id\` (\`usersId\` int NOT NULL, \`rolesId\` int NOT NULL, INDEX \`IDX_946d0fd771a9af5abd0084664a\` (\`usersId\`), INDEX \`IDX_4f641abf4c184177f37d75a409\` (\`rolesId\`), PRIMARY KEY (\`usersId\`, \`rolesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_id\` ADD CONSTRAINT \`FK_946d0fd771a9af5abd0084664ae\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_id\` ADD CONSTRAINT \`FK_4f641abf4c184177f37d75a409c\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_id\` DROP FOREIGN KEY \`FK_4f641abf4c184177f37d75a409c\``);
        await queryRunner.query(`ALTER TABLE \`user_id\` DROP FOREIGN KEY \`FK_946d0fd771a9af5abd0084664ae\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updated_at\` \`updated_at\` timestamp NOT NULL DEFAULT ''0000-00-00 00:00:00''`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`created_at\` \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()`);
        await queryRunner.query(`DROP INDEX \`IDX_4f641abf4c184177f37d75a409\` ON \`user_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_946d0fd771a9af5abd0084664a\` ON \`user_id\``);
        await queryRunner.query(`DROP TABLE \`user_id\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`users_details\``);
    }

}
