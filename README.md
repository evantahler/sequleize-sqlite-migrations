An example showing that if a Sqlite table has a compound index on it, Sequelize migrations that make a temporary table incorrectly apply a unique constraint to every column that was part of the compound index.

With a compound unique index:

```js
await queryInterface.addIndex("posts", ["name", "image"], {
  unique: true,
  fields: ["name", "image"],
});
```

Migrations which do a full table copy end up creating normal unique constraints (not indexes) on the columns which used to be in the index:

![image](https://raw.githubusercontent.com/evantahler/sequleize-sqlite-migrations/master/images/image.png)

## Instructions

1. Clone this repo
2. `npm install`
3. `./node_modules/.bin/sequelize-cli db:migrate`

Note that migration 1 properly makes the table with a compound index:

```
Executing (default): CREATE TABLE IF NOT EXISTS `posts` (`id` VARCHAR(255), `name` VARCHAR(255), `image` VARCHAR(255));
Executing (default): CREATE UNIQUE INDEX `posts_name_image` ON `posts` (`name`, `image`)
```

However the second migration re-creates the table with UNIQUE applied directly to `name` and `image`.

```
Executing (default): CREATE TABLE IF NOT EXISTS `posts_backup` (`id` VARCHAR(255), `name` VARCHAR(255) UNIQUE, `image` VARCHAR(255) UNIQUE, `position` BIGINT NOT NULL DEFAULT '0');
Executing (default): INSERT INTO `posts_backup` SELECT `id`, `name`, `image`, `position` FROM `posts`;
Executing (default): DROP TABLE `posts`;
Executing (default): CREATE TABLE IF NOT EXISTS `posts` (`id` VARCHAR(255), `name` VARCHAR(255) UNIQUE, `image` VARCHAR(255) UNIQUE, `position` BIGINT NOT NULL DEFAULT '0');
```
