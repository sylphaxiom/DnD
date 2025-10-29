CREATE TABLE IF NOT EXISTS `web_form` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'PK',
    `target` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'intake' COMMENT 'one of (who_group)',
    `name` varchar(64) NOT NULL,
    `email` varchar(128) NOT NULL,
    `subject` varchar(255) NOT NULL,
    `message` text NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = 'Temporary table until full DB is required.'

CREATE TABLE IF NOT EXISTS `abilities` (
    `name` varchar(25) NOT NULL,
    `description` text NOT NULL,
    `tags` text,
    PRIMARY KEY (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `armor_types` (
    `type` varchar(25) NOT NULL,
    `ac` varchar(10) NOT NULL COMMENT 'number or like 12+DEX',
    `base_STR` int DEFAULT NULL,
    `noisy` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'true if impose disadvantage',
    `category` enum(
        'light',
        'medium',
        'heavy',
        'shield'
    ) NOT NULL,
    PRIMARY KEY (`type`),
    KEY `category` (`category`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `background` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(25) NOT NULL,
    `description` text NOT NULL,
    `source` int NOT NULL COMMENT 'FK source.id',
    PRIMARY KEY (`id`),
    KEY `FK_sources` (`source`),
    KEY `title` (`title`),
    CONSTRAINT `FK_sources` FOREIGN KEY (`source`) REFERENCES `sources` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `background_features` (
    `id` int NOT NULL AUTO_INCREMENT,
    `background` varchar(25) NOT NULL COMMENT 'FK background.title',
    `title` varchar(25) NOT NULL,
    `description` text NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_background` (`background`),
    CONSTRAINT `FK_background` FOREIGN KEY (`background`) REFERENCES `background` (`title`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `background_item` (
    `background` int NOT NULL,
    `item` int NOT NULL,
    PRIMARY KEY (`background`, `item`),
    KEY `FK_item_bg` (`item`),
    CONSTRAINT `FK_bg_item` FOREIGN KEY (`background`) REFERENCES `background` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_item_bg` FOREIGN KEY (`item`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `background_languages` (
    `background` int NOT NULL COMMENT 'FK background.id',
    `languages` int NOT NULL COMMENT 'FK languages.id',
    PRIMARY KEY (`background`, `languages`),
    KEY `FK_lang_bg` (`languages`),
    CONSTRAINT `FK_bg_lang` FOREIGN KEY (`background`) REFERENCES `background` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_lang_bg` FOREIGN KEY (`languages`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `background_skills` (
    `background` int NOT NULL COMMENT 'FK background.id',
    `skill` varchar(25) NOT NULL COMMENT 'FK skills.skill',
    PRIMARY KEY (`background`, `skill`),
    KEY `FK_skill_bg` (`skill`),
    CONSTRAINT `FK_bg_skill` FOREIGN KEY (`background`) REFERENCES `background` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_skill_bg` FOREIGN KEY (`skill`) REFERENCES `skills` (`skill`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `background_tools` (
    `background` int NOT NULL,
    `tool` int NOT NULL,
    PRIMARY KEY (`background`, `tool`),
    KEY `FK_tool_bg` (`tool`),
    CONSTRAINT `FK_bg_tool` FOREIGN KEY (`background`) REFERENCES `background` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_tool_bg` FOREIGN KEY (`tool`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `class` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(25) NOT NULL,
    `hit_die` varchar(6) NOT NULL COMMENT 'die notation like 4d8',
    `mech_name` varchar(25) DEFAULT NULL COMMENT 'for mechanics like wild shape',
    `mech_value` int DEFAULT NULL COMMENT 'for mechanic counters like wild magic surge',
    `flavor` text NOT NULL,
    `spell_stat` enum(
        'STR',
        'DEX',
        'CON',
        'WIS',
        'INT',
        'CHA'
    ) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `class_abilities` (
    `class` int NOT NULL COMMENT 'FK class.id',
    `abilities` varchar(25) NOT NULL COMMENT 'FK abilities.name',
    PRIMARY KEY (`class`, `abilities`),
    KEY `FK_abil_cls` (`abilities`),
    CONSTRAINT `FK_abil_cls` FOREIGN KEY (`abilities`) REFERENCES `abilities` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_cls_abil` FOREIGN KEY (`class`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `class_armor` (
    `class` int NOT NULL COMMENT 'FK class.id',
    `armor` enum(
        'light',
        'medium',
        'heavy',
        'shield'
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'FK armor_type.category',
    PRIMARY KEY (`class`, `armor`),
    KEY `FK_armor_cls` (`armor`),
    CONSTRAINT `FK_armor_cls` FOREIGN KEY (`armor`) REFERENCES `armor_types` (`category`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_cls_armor` FOREIGN KEY (`class`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `class_skill` (
    `class` int NOT NULL,
    `skill` varchar(25) NOT NULL,
    PRIMARY KEY (`class`, `skill`),
    KEY `FK_skill_cls` (`skill`),
    CONSTRAINT `FK_cls_skill` FOREIGN KEY (`class`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_skill_cls` FOREIGN KEY (`skill`) REFERENCES `skills` (`skill`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `class_tools` (
    `class` int NOT NULL COMMENT 'FK class.id',
    `tool` int NOT NULL COMMENT 'FK tool.id',
    PRIMARY KEY (`class`, `tool`),
    KEY `FK_tool_cls` (`tool`),
    CONSTRAINT `FK_cls_tool` FOREIGN KEY (`class`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_tool_cls` FOREIGN KEY (`tool`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `class_weapon` (
    `class` int NOT NULL COMMENT 'FK class.id',
    `weapon` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'FK weapon_types.TYPE',
    PRIMARY KEY (`class`, `weapon`),
    KEY `FK_weapon_cls` (`weapon`),
    CONSTRAINT `FK_cls_weapon` FOREIGN KEY (`class`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_weapon_cls` FOREIGN KEY (`weapon`) REFERENCES `weapon_types` (`type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `feats` (
    `name` varchar(25) NOT NULL,
    `description` text NOT NULL,
    `requirements` varchar(200) NOT NULL,
    `tags` text COMMENT 'array of string tags.',
    PRIMARY KEY (`name`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `item` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `type` enum(
        'armor',
        'potion',
        'ring',
        'rod',
        'scroll',
        'staff',
        'wand',
        'weapon',
        'wonderous item'
    ) NOT NULL,
    `rarity` enum(
        'common',
        'uncommon',
        'rare',
        'very rare',
        'leagendary',
        'artifact'
    ) NOT NULL,
    `source` int NOT NULL COMMENT 'FK source.id',
    `magic` tinyint(1) NOT NULL DEFAULT '0',
    `tags` text,
    `weight` int NOT NULL DEFAULT '1',
    `attunement` int NOT NULL,
    `charges` int DEFAULT NULL,
    `reset` varchar(200) DEFAULT NULL,
    `restrictions` varchar(200) DEFAULT NULL,
    `description` text NOT NULL,
    PRIMARY KEY (`id`),
    KEY `FK_item_src` (`source`),
    CONSTRAINT `FK_item_src` FOREIGN KEY (`source`) REFERENCES `sources` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `languages` (
    `id` int NOT NULL AUTO_INCREMENT,
    `language` varchar(25) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 20 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `pc` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `player` varchar(25) NOT NULL COMMENT 'FK player.username',
    `background` int NOT NULL COMMENT 'FK background.id',
    `species` int NOT NULL COMMENT 'FK species.id',
    `alignment` enum(
        'lawful_good',
        'lawful_neutral',
        'lawful_evil',
        'neutral_good',
        'true_neutral',
        'neutral_evil',
        'chaotic_good',
        'chaotic_neutral',
        'chaotic_evil'
    ) NOT NULL DEFAULT 'true_neutral',
    `age` int DEFAULT NULL,
    `height` varchar(10) DEFAULT NULL,
    `weight` int DEFAULT NULL,
    `eyes` varchar(200) DEFAULT NULL,
    `skin` varchar(200) DEFAULT NULL,
    `hair` varchar(200) DEFAULT NULL,
    `appearance` text,
    `allies_orgs` text,
    `backstory` text,
    `personality_traits` text,
    `ideals` text,
    `bonds` text,
    `flaws` text,
    `strength` int NOT NULL DEFAULT '10',
    `dexterity` int NOT NULL DEFAULT '10',
    `constitution` int NOT NULL DEFAULT '10',
    `wisdom` int NOT NULL DEFAULT '10',
    `intelligence` int NOT NULL DEFAULT '10',
    `charisma` int NOT NULL DEFAULT '10',
    `inspiration` tinyint(1) NOT NULL DEFAULT '0',
    `states` text COMMENT 'used to store states like temp HP',
    PRIMARY KEY (`id`),
    KEY `FK_pc_player` (`player`),
    KEY `FK_pc_background` (`background`),
    KEY `FK_pc_species` (`species`),
    CONSTRAINT `FK_pc_background` FOREIGN KEY (`background`) REFERENCES `background` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `FK_pc_player` FOREIGN KEY (`player`) REFERENCES `player` (`username`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `FK_pc_species` FOREIGN KEY (`species`) REFERENCES `species` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `pc_class` (
    `PC` int NOT NULL COMMENT 'FK pc.id',
    `class` int NOT NULL COMMENT 'FK class.id',
    PRIMARY KEY (`PC`, `class`),
    KEY `FK_cls_pc` (`class`),
    CONSTRAINT `FK_cls_pc` FOREIGN KEY (`class`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_pc_cls` FOREIGN KEY (`PC`) REFERENCES `pc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `pc_feats` (
    `pc` int NOT NULL COMMENT 'FK pc.id',
    `feat` varchar(25) NOT NULL COMMENT 'FK feat.name',
    PRIMARY KEY (`pc`, `feat`),
    KEY `FK_feat_pc` (`feat`),
    CONSTRAINT `FK_feat_pc` FOREIGN KEY (`feat`) REFERENCES `feats` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_pc_feat` FOREIGN KEY (`pc`) REFERENCES `pc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `pc_item` (
    `pc` int NOT NULL COMMENT 'FK pc.id',
    `item` int NOT NULL COMMENT 'FK items.id',
    PRIMARY KEY (`pc`, `item`),
    KEY `FK_item_pc` (`item`),
    CONSTRAINT `FK_item_pc` FOREIGN KEY (`item`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_pc_item` FOREIGN KEY (`pc`) REFERENCES `pc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `pc_languages` (
    `pc` int NOT NULL COMMENT 'FK pc.id',
    `language` int NOT NULL COMMENT 'FK languages.id',
    PRIMARY KEY (`pc`, `language`),
    KEY `FK_lang_pc` (`language`),
    CONSTRAINT `FK_lang_pc` FOREIGN KEY (`language`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_pc_lang` FOREIGN KEY (`pc`) REFERENCES `pc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `pc_skills` (
    `pc` int NOT NULL COMMENT 'FK pc.id',
    `skill` varchar(25) NOT NULL COMMENT 'FK skills.skill',
    PRIMARY KEY (`pc`, `skill`),
    KEY `FK_skill_pc` (`skill`),
    CONSTRAINT `FK_pc_skill` FOREIGN KEY (`pc`) REFERENCES `pc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_skill_pc` FOREIGN KEY (`skill`) REFERENCES `skills` (`skill`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `pc_subclass` (
    `pc` int NOT NULL COMMENT 'FK pc.id',
    `subclass` varchar(25) NOT NULL COMMENT 'FK subclass_features.subclass',
    PRIMARY KEY (`pc`, `subclass`),
    KEY `FK_subcls_pc` (`subclass`),
    CONSTRAINT `FK_pc_subcls` FOREIGN KEY (`pc`) REFERENCES `pc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_subcls_pc` FOREIGN KEY (`subclass`) REFERENCES `subclass_feature` (`subclass`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `pc_tools` (
    `pc` int NOT NULL COMMENT 'FK pc.id',
    `tool` int NOT NULL COMMENT 'FK tools.id',
    PRIMARY KEY (`pc`, `tool`),
    KEY `FK_tool_pc` (`tool`),
    CONSTRAINT `FK_pc_tool` FOREIGN KEY (`pc`) REFERENCES `pc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_tool_pc` FOREIGN KEY (`tool`) REFERENCES `tools` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `player` (
    `username` varchar(25) NOT NULL,
    `first_name` varchar(25) NOT NULL,
    `last_name` varchar(25) NOT NULL,
    `email` varchar(150) NOT NULL,
    `role` enum(
        'player',
        'dm',
        'admin',
        'homebrewer'
    ) NOT NULL DEFAULT 'player',
    `pwd` char(128) NOT NULL,
    `init_ts` int NOT NULL COMMENT 'Unix timestamp of original record creation.',
    `lockout` tinyint(1) NOT NULL DEFAULT '0',
    `preferences` text COMMENT 'string dict of user preferences.',
    PRIMARY KEY (`username`),
    UNIQUE KEY `UNIQUE_email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `skills` (
    `skill` varchar(25) NOT NULL,
    `stat` varchar(3) NOT NULL,
    `description` text NOT NULL,
    PRIMARY KEY (`skill`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `sources` (
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(50) NOT NULL,
    `author` varchar(200) NOT NULL,
    `publisher` varchar(50) NOT NULL,
    `pub_year` int NOT NULL,
    `license` varchar(25) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `species` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(25) NOT NULL,
    `description` text NOT NULL,
    `type` enum(
        'aberration',
        'beast',
        'celestial',
        'construct',
        'dragon',
        'elemental',
        'fey',
        'fiend',
        'giant',
        'humanoid',
        'monstrosity',
        'ooze',
        'plant',
        'undead'
    ) NOT NULL DEFAULT 'humanoid',
    `size` enum(
        'tiny',
        'small',
        'medium',
        'large',
        'huge',
        'gargantuan'
    ) NOT NULL DEFAULT 'medium',
    `speed` int NOT NULL DEFAULT '25',
    `lifespan` varchar(10) NOT NULL DEFAULT '80-100' COMMENT 'range in years like 200-300',
    `stat_incr` varchar(9) DEFAULT NULL COMMENT 'up to 3 stats like DEX',
    `avg_height` varchar(10) DEFAULT NULL COMMENT 'char format w label like 5ft.5in.',
    `avg_weight` int DEFAULT NULL COMMENT 'weight assumed to be lbs.',
    `ref_img` blob,
    `source` int NOT NULL COMMENT 'FK source.id',
    PRIMARY KEY (`id`),
    KEY `FK_species_src` (`source`),
    CONSTRAINT `FK_species_src` FOREIGN KEY (`source`) REFERENCES `sources` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `species_abilities` (
    `species` int NOT NULL COMMENT 'FK species.id',
    `ability` varchar(25) NOT NULL COMMENT 'FK abilities.name',
    PRIMARY KEY (`species`, `ability`),
    KEY `FK_ability_species` (`ability`),
    CONSTRAINT `FK_ability_species` FOREIGN KEY (`ability`) REFERENCES `abilities` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_species_ability` FOREIGN KEY (`species`) REFERENCES `species` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `subclass_feature` (
    `name` varchar(25) NOT NULL,
    `description` text NOT NULL,
    `class` int NOT NULL COMMENT 'FK class.id',
    `subclass` varchar(25) NOT NULL,
    PRIMARY KEY (`name`),
    KEY `subclass` (`subclass`),
    KEY `FK_cls` (`class`),
    CONSTRAINT `FK_cls` FOREIGN KEY (`class`) REFERENCES `class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `tools` (
    `id` int NOT NULL AUTO_INCREMENT,
    `tool` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 31 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `weapon_properties` (
    `prop` varchar(25) NOT NULL,
    `description` text NOT NULL,
    `mastery` tinyint(1) NOT NULL,
    PRIMARY KEY (`prop`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `weapon_types` (
    `type` varchar(25) NOT NULL,
    `martial` tinyint(1) NOT NULL DEFAULT '0',
    `ranged` tinyint(1) NOT NULL DEFAULT '0',
    `dmg_type` enum(
        'acid',
        'bludgeoning',
        'cold',
        'fire',
        'force',
        'lightning',
        'necrotic',
        'piercing',
        'poison',
        'psychic',
        'radiant',
        'slashing',
        'thunder'
    ) NOT NULL,
    `dice` varchar(6) NOT NULL COMMENT 'dice notation like 2d4',
    `weight` int NOT NULL,
    `cost` int NOT NULL,
    `range_val` varchar(10) DEFAULT NULL COMMENT 'weapon range like 60/120',
    PRIMARY KEY (`type`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci

CREATE TABLE IF NOT EXISTS `weapon_weapon_props` (
    `weapon` varchar(25) NOT NULL COMMENT 'FK weapon_types.type',
    `properties` varchar(25) NOT NULL COMMENT 'FK weapon_properties.prop',
    PRIMARY KEY (`weapon`, `properties`),
    KEY `FK_weap_prop_weap` (`properties`),
    CONSTRAINT `FK_weap_prop_weap` FOREIGN KEY (`properties`) REFERENCES `weapon_properties` (`prop`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `FK_weap_weap_prop` FOREIGN KEY (`weapon`) REFERENCES `weapon_types` (`type`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci